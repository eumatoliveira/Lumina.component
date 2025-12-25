import puppeteer, { Browser, Page } from 'puppeteer';
import { db } from './db';

interface ComponentDoc {
  name: string;
  category: string;
  code: string;
  installCommand: string;
  url: string;
}

export class DocCrawler {
  private browser: Browser | null = null;
  private onProgress?: (msg: string) => void;

  constructor(onProgress?: (msg: string) => void) {
      this.onProgress = onProgress;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.log('🤖 Lumina Crawler Initialized');
  }

  async close() {
    if (this.browser) await this.browser.close();
  }

  private log(msg: string) {
      console.log(msg);
      if (this.onProgress) this.onProgress(msg);
  }

  // 1. Map the sidebar to get all links
  async mapSidebar(baseUrl: string): Promise<string[]> {
    if (!this.browser) await this.init();
    const page = await this.browser!.newPage();
    this.log(`Navigating to ${baseUrl}...`);
    try {
        await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (e) {
        this.log(`Failed to load base URL: ${e}`);
        await page.close();
        return [];
    }

    this.log('🗺️ Mapping navigation structure...');

    // STRATEGY: Get links from the left sidebar
    const links = await page.evaluate(() => {
      // Heuristic selectors for Sidebar in doc sites (React Bits, Shadcn, Nextra)
      const sidebarLinks = Array.from(document.querySelectorAll('aside nav a, .sidebar a, nav a, .docs-sidebar a'));
      return sidebarLinks
        .map(a => (a as HTMLAnchorElement).href)
        .filter(href => {
            // Filter only relevant component pages
            return (
                (href.includes('/components/') || href.includes('/text-animations/') || href.includes('/animations/')) &&
                href.startsWith(window.location.origin)
            );
        });
    });

    const uniqueLinks = [...new Set(links)];
    this.log(`📍 Found ${uniqueLinks.length} component pages.`);
    await page.close();
    return uniqueLinks;
  }

  // 2. Extract data from a specific page
  async scrapeComponentPage(url: string): Promise<ComponentDoc | null> {
    const page = await this.browser!.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });

      // A. Extract Title
      const title = await page.$eval('h1', el => el.textContent?.trim() || 'Unknown').catch(() => 'Unknown');

      // B. SMART INTERACTION (Visual Knowledge Harvester Logic)
      // Uses XPath for robust, case-insensitive button checking
      const codeTabClicked = await this.smartCodeExtractor(page);
      
      if (!codeTabClicked) {
           // console.log(`   ⚠️ No "Code" tab interaction needed or found for ${title}`);
      }

      // C. Wait for code container
      try {
        await page.waitForSelector('pre, code', { timeout: 4000 });
      } catch (e) {
          return null; // No code found
      }

      // D. Extract Code Text
      const result = await page.evaluate(() => {
        const codeBlocks = Array.from(document.querySelectorAll('pre'));
        if (codeBlocks.length === 0) return { code: '', install: '' };
        
        let install = '';
        let code = '';

        // Heuristic: Last block is usually the big component code, first is install
        const sorted = codeBlocks.sort((a, b) => b.innerText.length - a.innerText.length);
        
        // Assuming the longest block is the code
        code = sorted[0].innerText;

        // If there's a smaller block that looks like a command
        if (sorted.length > 1) {
            const smallest = sorted[sorted.length - 1];
            if (smallest.innerText.includes('npm') || smallest.innerText.includes('yarn') || smallest.innerText.includes('pnpm')) {
                install = smallest.innerText;
            }
        }

        return { code, install };
      });

      if (!result.code || result.code.length < 20) return null;

      // E. Generate AI Prompt (In-Memory)
      // We store this in the extracted logic for the Frontend to display
      const lib = result.code.includes('framer-motion') ? 'Framer Motion' : 'CSS/GSAP';
      const aiPrompt = `Atue como Especialista em Motion Design.\nCrie um componente React chamado '${title}' utilizando ${lib}.\n...\n(Código Referência anexado)`;

      return {
        name: title,
        category: 'React Component',
        code: result.code,
        installCommand: result.install,
        url: url
      };

    } catch (error) {
      console.error(`❌ Error scraping ${url}:`, error);
      return null;
    } finally {
      await page.close();
    }
  }

  // --- FUNÇÃO AUXILIAR: INTERAÇÃO HUMANA (The Smart Clicker) ---
  private async smartCodeExtractor(page: Page): Promise<boolean> {
    try {
        // 1. HEURÍSTICA DE CLIQUE (Busca Visual Case-Insensitive via XPath)
        // Procura botões com texto "Code", "Source", "View"
        const tabSelector = `//button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'code')] | //div[contains(@class, 'tab') and contains(., 'Code')] | //span[contains(text(), 'Code')]`;
        
        // Tenta encontrar e clicar
        await page.waitForXPath(tabSelector, { timeout: 2000 });
        const tabs = await page.$x(tabSelector);
        
        if (tabs.length > 0) {
            // console.log('   👆 Aba "Code" detectada. Executando clique...');
            await (tabs[0] as any).click();
            // Pausa cognitiva para o React renderizar
            await new Promise(r => setTimeout(r, 800));
            return true;
        }
        return false;
    } catch (e) {
        // console.log('   ⚠️  Nenhuma aba "Code" explícita encontrada. Verificando se já está visível...');
        return false;
    }
  }

  // Helper legacy removed (clickCodeTab) in favor of smartCodeExtractor


  // 3. The Orchestrator
  async runFullCrawl(rootUrl: string): Promise<any[]> {
    await this.init();
    const results = [];
    
    // 1. Map
    const links = await this.mapSidebar(rootUrl);
    
    // 2. Iterate (Sequential for safety)
    if (links.length === 0) {
        this.log('No links found. Trying to scrape the root page itself...');
        links.push(rootUrl);
    }

    // Limit to 20 for this demo/turn to ensure we return in time
    const safeLinks = links.slice(0, 25);
    
    for (const link of safeLinks) {
      this.log(`Scraping: ${link}`);
      const data = await this.scrapeComponentPage(link);
      
      if (data) {
        this.log(`💾 Saving pattern: ${data.name}`);
        
        // 3. Save to Brain (DB)
        const saved = await db.save({
            source_url: data.url,
            element_selector: 'Auto-Crawled',
            animation_type: data.name,
            tech_detected: ['React', 'Framer Motion', 'Tailwind'],
            complexity_score: 75,
            extracted_pattern: {
                trigger: 'manual-scrape',
                properties: {},
                description: `Auto-scraped component "${data.name}"`,
                code_snippet: data.code,
                install_command: data.installCommand
            }
        });
        results.push(saved);
      }
    }

    await this.close();
    this.log('✅ Crawl finished successfully.');
    return results;
  }
}

// Export adapter for existing API
export const scraper = {
    crawl: async (rootUrl: string, onProgress?: (msg: string) => void) => {
        const crawler = new DocCrawler(onProgress);
        return crawler.runFullCrawl(rootUrl);
    }
};

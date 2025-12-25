import puppeteer, { Page } from 'puppeteer';

export interface ExtractedPattern {
    trigger: string;
    threshold?: string;
    properties: Record<string, { from: string | number; to: string | number }>;
    duration?: string;
    easing?: string;
    tech_context?: string[]; 
    description?: string;
    code_snippet?: string; // Captured code
    install_command?: string;
}


export interface AnalysisResult {
  url: string;
  tech_stack: string[];
  animation_types: string[];
  complexity_score: number;
  extracted_pattern?: ExtractedPattern; // The new V2 field
  element_selector?: string;
}

export async function analyzeUrl(url: string): Promise<AnalysisResult> {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1440, height: 900 });
    
    // 1. Navigate
    console.log(`[Agent] Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Allow some time for initial animations (Load animations)
    await new Promise(r => setTimeout(r, 1000));

    // 2. Identify Target Element
    const targetSelector = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        if (h1) return 'h1';
        const hero = document.querySelector('[class*="hero"]');
        if (hero) return `.${hero.className.split(' ')[0]}`;
        return 'body';
    });
    console.log(`[Agent] Targeting element: ${targetSelector}`);

    // --- SMART INTERACTION (Ported from Harvester/Scraper) ---
    // We execute the click from Puppeteer (Node context) using robust XPath, 
    // exactly like the Crawler does.
    try {
        const tabSelector = `//button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'code')] | //div[contains(@class, 'tab') and contains(., 'Code')] | //span[contains(text(), 'Code')]`;
        // Wait briefly for tabs to be available
        try { await page.waitForXPath(tabSelector, { timeout: 2000 }); } catch (e) {}
        
        const tabs = await page.$x(tabSelector);
        if (tabs.length > 0) {
            console.log('[Agent] Found "Code" tab. Clicking...');
            await (tabs[0] as any).click();
            await new Promise(r => setTimeout(r, 800)); // Wait for React render
        }
    } catch (e) {
        console.log('[Agent] Smart interaction failed or no tab found. Proceeding.');
    }

    // 3. Inject "Deep Extraction" Script
    const extraction = await page.evaluate(async (selector) => {
        const el = document.querySelector(selector) as HTMLElement;
        
        // --- PASSIVE SCRAPING (Reading DOM, no interaction) ---
        let scrapedCode = '';
        let installCmd = '';
        
        try {
            // Find code blocks (now visible after smart click)
            const pres = Array.from(document.querySelectorAll('pre'));
            if (pres.length > 0) {
                 // Sort by length: longest is usually the component code
                 const sorted = pres.sort((a, b) => b.innerText.length - a.innerText.length);
                 scrapedCode = sorted[0].innerText;

                 // If we have multiple, look for install command
                 if (pres.length > 1) {
                     // Check smaller blocks for 'npm/yarn'
                     const potentialInstall = pres.find(p => p !== sorted[0] && (p.innerText.includes('npm') || p.innerText.includes('yarn')));
                     if (potentialInstall) installCmd = potentialInstall.innerText;
                 } else {
                     // Only one block - check if it's install or code
                     if (scrapedCode.includes('npm install') || scrapedCode.includes('yarn add')) {
                         installCmd = scrapedCode;
                         scrapedCode = ''; // Reset if it's just install
                     }
                 }
            }
        } catch (e) { }
        // ------------------------------------------------

        if (!el) return { pattern: null, tech: [], code: scrapedCode, install: installCmd };

        const snapshots: Record<string, string>[] = [];
        const propsToWatch = ['opacity', 'transform', 'filter', 'clip-path'];
        
        // Helper to capture style
        const capture = () => {
            const style = window.getComputedStyle(el);
            const snap: Record<string, string> = {};
            propsToWatch.forEach(p => snap[p] = style.getPropertyValue(p));
            snapshots.push(snap);
        };

        // Capture initial state
        capture();

        // Simulate Action: Scroll down smoothly to trigger scroll animations
        const distance = 500;
        const steps = 20;
        for (let i = 0; i <= steps; i++) {
            window.scrollTo(0, (distance / steps) * i);
            await new Promise(resolve => setTimeout(resolve, 50)); // Wait 50ms per step
            capture();
        }

        // Return the gathered data
        const result: any = {
            trigger: 'scroll', 
             properties: {}
        };

        propsToWatch.forEach(prop => {
            const first = snapshots[0][prop];
            const last = snapshots[snapshots.length - 1][prop];
            
            if (first !== last && first !== 'none' && last !== 'none') {
                result.properties[prop] = { from: first, to: last };
            }
        });

        // @ts-ignore
        const tech: string[] = [];
        // @ts-ignore
        if (window.gsap) tech.push('GSAP');
        // @ts-ignore
        if (window.framerMotion) tech.push('Framer Motion');
        
        return {
            pattern: result,
            tech,
            code: scrapedCode,
            install: installCmd
        };
    }, targetSelector);


    // 4. Construct Result
    let pattern: ExtractedPattern | undefined;
    
    // Use code snippet to enhance confidence
    const hasCode = extraction?.code && extraction.code.length > 20;

    if (extraction && extraction.pattern && Object.keys(extraction.pattern.properties).length > 0) {
        pattern = {
            trigger: 'viewport-entry (scroll)',
            threshold: '20% bottom',
            properties: extraction.pattern.properties,
            duration: '0.8s', // Estimated
            easing: 'ease-out', // Estimated
            tech_context: extraction.tech,
            description: `Animated transition of ${targetSelector} on scroll.`,
            code_snippet: extraction.code // Field for V3 Prompt
        };
    } else {
        // Fallback pattern if no visual changes detected but we found code
        pattern = {
            trigger: hasCode ? 'component-mount' : 'load',
            properties: { 
                opacity: { from: 0, to: 1 },
                transform: { from: 'translateY(20px)', to: 'translateY(0px)' }
            },
            tech_context: extraction?.tech || ['CSS Transitions'],
            description: hasCode ? 'Extracted code directly from documentation.' : 'Simulated load animation.',
            code_snippet: extraction?.code // Pass it through
        };
    }

    return {
      url,
      tech_stack: extraction?.tech || ['React'],
      animation_types: hasCode ? ['Docs Component'] : (Object.keys(pattern.properties).length > 0 ? ['Scroll Reveal'] : ['Static']),
      complexity_score: hasCode ? 100 : 85,
      extracted_pattern: pattern,
      element_selector: targetSelector
    };


  } catch (error) {
    console.error('Puppeteer error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

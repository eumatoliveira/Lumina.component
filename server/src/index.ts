import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeUrl } from './analyzer';
import { db } from './db';
import { scraper } from './scraper';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Add SSE support or simple logging for now. For simplicity, we'll wait for the crawl.
// In a real V3, we'd use websockets or SSE.
app.post('/api/crawl', async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'Root URL is required' });

        console.log(`Starting Crawl on ${url}`);
        
        // This might take a while, so we might time out on Vercel, but local is fine.
        // Ideally run in background.
        const results = await scraper.crawl(url, (msg) => console.log(`[Progress] ${msg}`));
        
        res.json({ status: 'complete', pagesScraped: results.length, results });
    } catch (error) {
        console.error('Crawl failed:', error);
        res.status(500).json({ error: 'Crawl failed', details: String(error) });
    }
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Lumina Motion Hub' });
});


// History Endpoint (The Memory)
app.get('/api/animations', async (req: Request, res: Response) => {
    try {
        const history = await db.getAll();
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`Analyzing URL: ${url}`);
    const result = await analyzeUrl(url);

    // Persist to Memory (V2 Requirement)
    const savedRecord = await db.save({
        source_url: result.url,
        element_selector: result.element_selector,
        animation_type: result.animation_types[0] || 'Unknown',
        tech_detected: result.tech_stack,
        extracted_pattern: result.extracted_pattern,
        complexity_score: result.complexity_score
    });

    res.json(savedRecord);
  } catch (error) {
    console.error('Analysis failed:', error);
    res.status(500).json({ error: 'Failed to analyze URL', details: error instanceof Error ? error.message : String(error) });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

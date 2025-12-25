# 🚜 Visual Knowledge Harvester (Lumina Module)

**Version:** 1.0.0  
**Context:** Lumina Motion Hub -> Crawler Engine  
**Responsibility:** Autonomous extraction of Motion Components from Documentation Sites (e.g., React Bits).

---

## 🧠 Core Concept

The **Visual Knowledge Harvester** is not a simple HTML scraper. It is a **Cognitive Agent** designed to:
1.  **Mimic Human Navigation:** Understands "Documentation" structures (Sidebars, Navs).
2.  **Interact to Reveal:** Detects hidden code blocks (Visual "Code" tabs) and clicks them, simulating a developer's curiosity.
3.  **Synthesize Knowledge:** Extracts raw code + installation commands and packages them into **AI-Ready Prompts**.

## 🛠️ Implementation Architecture

The module uses **Puppeteer** (Headless Chrome) to perform DOM manipulation that `fetch` or `axios` cannot achieve.

### Flow Strategy
```mermaid
graph TD
    A[Start: Root URL] -->|Analyze| B(Map Sidebar)
    B -->|List Components| C{Iterate Links}
    C -->|Visit Page| D[Smart Interaction]
    D -->|Find 'Code' Tab| E[Click & Wait]
    E -->|DOM Mutation| F[Extract <pre> Content]
    F -->|Heuristic| G(Separate Install vs Code)
    G -->|Generate| H[AI Architect Prompt]
    H -->|Persist| I[Lumina Memory (JSON/DB)]
```

## 🚀 Running the Harvester

### As an API Service (Integrated)
The harvester is integrated into the Lumina Express Server.

**Endpoint:** `POST /api/crawl`
**Payload:**
```json
{
  "url": "https://reactbits.dev"
}
```

**Curl Example:**
```bash
curl -X POST http://localhost:3001/api/crawl \
     -H "Content-Type: application/json" \
     -d '{"url": "https://reactbits.dev"}'
```

### Standalone (Dev/Debug)
You can run the scraper directly if you extract it to a standalone script, but currently, it runs via `npm run dev` in the server package.

## 🧠 AI Prompt Evolution

The harvester generates a prompt stored in the `extracted_pattern` logic. To evolve this:
1.  **Dynamic Generation:** Instead of hardcoded templates, we can pass the extracted code to an LLM (OpenAI/Gemini) to generate a summary.
2.  **Metadata Enhancement:** We could parse the `package.json` dependencies from the install command to know exactly which `framer-motion` version is used.

---

## ⚠️ Resilience Patterns (Implemented)
-   **XPath Case-Insensitive Search:** Finds "code", "CODE", "View Code", "< >" robustly.
-   **Animation Wait:** Waits 600ms-800ms after clicking tabs for React state updates.
-   **Retry Strategy:** (Planned) If `page.goto` fails, retry 3 times with exponential backoff.

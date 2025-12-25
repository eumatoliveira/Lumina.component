import { AnimationRecord } from "./types";

export function generateIDEPrompt(record: AnimationRecord): string {
  // Defensive destructuring
  const { animation_type, tech_detected, extracted_pattern, element_selector } = record || {};

  // Safe fallback if extracted_pattern is missing (prevents crash)
  const safePattern = extracted_pattern || {
      trigger: 'unknown',
      properties: {},
      duration: 'unknown',
      easing: 'unknown',
      threshold: undefined
  };

  const { trigger, properties, duration, easing, threshold } = safePattern;

  // Format properties into a readable list
  const propList = properties 
    ? Object.entries(properties)
        .map(([key, value]) => `- ${key}: goes from '${value?.from}' to '${value?.to}'`)
        .join("\n")
    : "No specific properties detected.";

  const techStack = tech_detected && tech_detected.length > 0 
    ? tech_detected.join(" + ") 
    : "React + Framer Motion (recommended)";

  // V3: Inject Scraped Code
  // @ts-ignore
  const scrapedCode = extracted_pattern?.code_snippet 
    // @ts-ignore
    ? `\n💻 CÓDIGO REFERÊNCIA (EXTRAÍDO DA DOCUMENTAÇÃO):\n\n\`\`\`tsx\n${extracted_pattern.code_snippet}\n\`\`\`\n\n⚠️ MANTENHA A LÓGICA DESTE CÓDIGO, MAS ADAPTE PARA O FORMATO PEDIDO.` 
    : '';

  return `Atue como um especialista em Motion de Frontend (Lumina Motion Hub).

Quero recriar uma funcionalidade de animação que analisei de um site referência.
Gere o código do componente React limpo, funcional e performático.

---
📘 CONTEXTO TÉCNICO
- Tipo de Animação: ${animation_type || 'Custom'}
- Elemento Alvo: ${element_selector || "Container genérico / Wrapper"}
- Tech Stack Alvo: ${techStack}

💾 DADOS EXTRAÍDOS (REVERSE ENGINEERED)
O comportamento observado foi:

1. GATILHO: ${trigger} ${threshold ? `(Threshold: ${threshold})` : ''}

2. VALORES ANIMADOS:
${propList}

3. TIMING:
- Duração aprox: ${duration || "0.5s"}
- Curva (Easing): ${easing || "ease-out"}
${scrapedCode}

---
🎯 TAREFA
Escreva o código completo do componente. 
- Use boas práticas (Tailwind para layout, Framer Motion para animação).
- Se for scroll, use useScroll/whileInView.
- Se for hover, use whileHover.
- Mantenha o código limpo (Clean Code).
`;

}


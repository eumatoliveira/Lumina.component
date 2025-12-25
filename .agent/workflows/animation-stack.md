---
description: Guia completo de stacks de animação - CSS, JS, GSAP, Framer Motion, React
---

# 📦 MAPA GERAL — QUAL ANIMAÇÃO, QUAL STACK?

| Tipo de animação | Tecnologia | Framework ideal | Quando usar |
|:---|:---|:---|:---|
| Micro-interações | CSS puro | Qualquer | Hover, focus, estados simples |
| Transições previsíveis | CSS Keyframes | Qualquer | Loading, fade, slide |
| Animações JS leves | Anime.js | Vanilla / Vue | SVG, números, gráficos |
| Animações complexas | GSAP | Qualquer | Timelines, sequências |
| Scroll-driven | GSAP + ScrollTrigger | React / Next | Narrativa, landing pages |
| Motion declarativo | Framer Motion | React | UI state-driven |
| Motion físico | React Spring | React | UX natural |
| Registry / shadcn-style | ReactBits | React / Next | Performance premium |

---

# 1️⃣ ANIMAÇÕES CSS (BASE PERFORMÁTICA)

## 🔹 Fade + Translate (GPU Safe)

```css
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-up.show {
  opacity: 1;
  transform: translateY(0);
}
```

```html
<div class="fade-up" id="box">Hello</div>
```

```javascript
document.getElementById("box").classList.add("show");
```

✅ **Framework:** Qualquer (HTML puro, React, Vue)

---

## 🔹 Keyframes (Loading / Loop)

```css
@keyframes pulse {
  0% { transform: scale(1); opacity: .6; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: .6; }
}

.loader {
  animation: pulse 1.5s infinite ease-in-out;
}
```

---

# 2️⃣ ANIMAÇÕES JS LEVES — ANIME.JS

## 📦 Instalação
```bash
npm install animejs
```

## 📄 Código
```javascript
import anime from "animejs";

anime({
  targets: ".box",
  translateX: 250,
  opacity: [0, 1],
  duration: 800,
  easing: "easeOutExpo",
  delay: anime.stagger(100)
});
```

✅ **Ideal para:** SVG, Dashboards, Gráficos animados

---

# 3️⃣ GSAP — MOTOR PROFISSIONAL

## 📦 Instalação
```bash
npm install gsap
```

## 🔹 Timeline básica
```javascript
import gsap from "gsap";

const tl = gsap.timeline();

tl.from(".title", { y: 40, opacity: 0, duration: 0.6 })
  .from(".subtitle", { y: 20, opacity: 0 }, "-=0.3");
```

---

# 4️⃣ SCROLL ANIMATIONS — GSAP + ScrollTrigger

## 📦 Instalação
```bash
npm install gsap
```

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

## 🔹 Reveal on Scroll
```javascript
gsap.from(".reveal", {
  opacity: 0,
  y: 60,
  scrollTrigger: {
    trigger: ".reveal",
    start: "top 80%",
    end: "bottom 60%",
    scrub: true
  }
});
```

---

# 5️⃣ REACT — SCROLL REVEAL (PADRÃO REACTBITS)

## 📦 Stack Recomendada
- React ou Next.js
- GSAP
- Tailwind CSS (opcional, mas ideal)

## 📄 ScrollReveal.tsx (VERSÃO FUNCIONAL)

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({
  children,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4
}: {
  children: string;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll("span");

    gsap.fromTo(
      words,
      {
        opacity: baseOpacity,
        rotate: baseRotation,
        filter: `blur(${blurStrength}px)`
      },
      {
        opacity: 1,
        rotate: 0,
        filter: "blur(0px)",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div ref={ref}>
      {children.split(" ").map((w, i) => (
        <span key={i} className="inline-block mr-1">
          {w}
        </span>
      ))}
    </div>
  );
}
```

## 🔹 Uso
```tsx
<ScrollReveal blurStrength={8} baseRotation={5}>
  Transform your UX with scroll driven motion.
</ScrollReveal>
```

---

# 6️⃣ FRAMER MOTION (ALTERNATIVA REACT)

## 📦 Instalação
```bash
npm install framer-motion
```

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Hello Motion
</motion.div>
```

📌 **Melhor para:** UI state-based  
📌 **Pior para:** Scroll scrubbing complexo

---

# 7️⃣ ACESSIBILIDADE (OBRIGATÓRIO)

## CSS
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## JavaScript
```javascript
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

---

# 📊 DECISÃO RÁPIDA

```
┌─────────────────────────────────────────────────────────┐
│  QUAL STACK USAR?                                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Hover/Focus simples?  → CSS puro                       │
│  Loading spinner?      → CSS Keyframes                  │
│  SVG animado?         → Anime.js                        │
│  Timeline complexa?   → GSAP                            │
│  Scroll narrativo?    → GSAP + ScrollTrigger            │
│  React UI states?     → Framer Motion                   │
│  Physics-based?       → React Spring                    │
│  Premium components?  → ReactBits registry              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

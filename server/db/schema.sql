-- Database Schema for Lumina Motion Hub
-- Target: PostgreSQL / Supabase
-- Ideally managed via Prisma or Drizzle ORM

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE animations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_url TEXT NOT NULL,
    element_selector TEXT, -- e.g., ".hero-title"
    animation_type TEXT, -- 'scroll-reveal', 'hover-card', 'continuous-loop', 'loader'
    tech_detected TEXT[], -- ['gsap', 'framer-motion', 'css-animation']
    
    -- The Core "Memory" of the animation
    extracted_pattern JSONB NOT NULL, 
    /*
      Example Structure of extracted_pattern:
      {
        "trigger": "viewport-enter",
        "threshold": "20% bottom",
        "properties": {
            "opacity": { "from": 0, "to": 1 },
            "transform": { "from": "translateY(50px)", "to": "translateY(0)" }
        },
        "duration": "0.8s",
        "easing": "ease-out"
      }
    */

    complexity_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for quick lookups by URL or Type
CREATE INDEX idx_animations_source_url ON animations(source_url);
CREATE INDEX idx_animations_type ON animations(animation_type);

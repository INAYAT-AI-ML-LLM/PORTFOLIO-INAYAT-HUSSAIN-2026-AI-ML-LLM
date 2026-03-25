"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles, Terminal, Layers, Wrench, Database, Lock,
} from "lucide-react";
import { SKILL_CATEGORIES, ALL_SKILLS, SKILL_ICONS } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import HighlightSwipe from "@/components/ui/HighlightSwipe";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  sparkles: Sparkles,
  terminal: Terminal,
  layers: Layers,
  wrench: Wrench,
  database: Database,
  lock: Lock,
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Relying entirely on Framer Motion for scroll animations
    // to prevent intersection observer conflicts that hid the grid
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-36 md:py-48 overflow-hidden"
    >
      {/* Animated Dot Grid Background - 2026 flow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
        <div
          className="w-full h-full opacity-[0.08] grid-dots-flow"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,229,255,0.8) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }} className="relative z-10">
        {/* Section Title */}
        <div className="mb-20 text-center md:text-left flex flex-col items-center md:items-start">
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-accent-primary text-glow">
              02 — Skills
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-accent-primary to-transparent" />
          </motion.div>
          <h2
            className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 drop-shadow-lg"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            <HighlightSwipe>Tech Stack</HighlightSwipe>
          </h2>
        </div>

        {/* Skill Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {SKILL_CATEGORIES.map((cat, index) => {
            const IconComponent = ICON_MAP[cat.icon as keyof typeof ICON_MAP];
            return (
              <motion.div 
                key={cat.category} 
                className="skill-card h-full neon-border rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <GlassCard className="p-8 h-full flex flex-col hover:bg-white/5 transition-colors group" data-cursor="button">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-primary/20 to-transparent flex items-center justify-center border border-accent-primary/30 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-all duration-500">
                      <IconComponent size={24} className="text-accent-primary drop-shadow-[0_0_8px_rgba(0,229,255,1)]" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-text-primary tracking-wide">
                      {cat.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-white/5 text-text-primary flex items-center gap-2 font-mono text-[12px] border border-white/10 hover:border-accent-primary/50 hover:bg-accent-primary/10 hover:text-accent-primary hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300"
                      >
                        {SKILL_ICONS[skill as keyof typeof SKILL_ICONS] && (
                          <i className={`${SKILL_ICONS[skill as keyof typeof SKILL_ICONS]} text-base`} />
                        )}
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Tech Cloud */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {ALL_SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              className="px-5 py-2.5 rounded-full glass-card flex items-center gap-2.5 font-mono text-sm text-text-muted hover:text-text-primary hover:border-accent-secondary hover:bg-accent-secondary/10 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] transition-all duration-300 hover:-translate-y-1 cursor-none"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: i * 0.02,
              }}
              data-cursor="button"
            >
              {SKILL_ICONS[skill as keyof typeof SKILL_ICONS] && (
                <i className={`${SKILL_ICONS[skill as keyof typeof SKILL_ICONS]} text-lg`} />
              )}
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

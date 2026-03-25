"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-48 md:py-64 overflow-hidden perspective-1000"
    >
      {/* 3D Moving Mesh Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ y: bgY }}
      >
        <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-accent-primary/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-accent-secondary/20 rounded-full blur-[150px] mix-blend-screen" />
      </motion.div>
      
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }} className="relative z-10">
        {/* Section Title */}
        <div className="text-center mb-32 md:mb-40 perspective-[800px]">
          <motion.div
            initial={{ opacity: 0, rotateX: 30, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-accent-primary block mb-6 px-6 py-2 border border-accent-primary/20 rounded-full inline-block bg-accent-primary/5 backdrop-blur-md">
              04 — Journey
            </span>
            <h2
              className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-primary to-text-primary/30 drop-shadow-2xl"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 1.1 }}
            >
              Experience
              <br/>
              <span className="text-accent-secondary opacity-60 italic">&amp; Education</span>
            </h2>
          </motion.div>
        </div>

        {/* 2026 Spatial Grid - ZERO LINES, IMMERSIVE LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-24 gap-x-12 md:gap-x-24 md:gap-y-40 auto-rows-min">
          {EXPERIENCE.map((item, i) => {
            const Icon = item.type === "education" ? GraduationCap : Briefcase;
            const accentColor = item.type === "education" ? "var(--accent-secondary)" : "var(--accent-primary)";
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={item.id}
                className={`relative transform-gpu will-change-transform ${isEven ? 'md:translate-y-0' : 'md:translate-y-48'}`}
                initial={{ opacity: 0, y: 150, rotateX: 20, rotateY: isEven ? -10 : 10, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1 // Subtle delay
                }}
              >
                {/* Float illusion layer */}
                <div className="neon-border rounded-[2rem] h-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
                  <GlassCard className="p-10 md:p-14 transition-all duration-700 hover:bg-text-primary/[0.04] bg-bg-tertiary/60 border-border-glass hover:border-text-primary/15 h-full flex flex-col group overflow-hidden">
                    
                    {/* Glowing huge background icon */}
                    <div className="absolute -right-10 -top-10 text-[200px] opacity-[0.02] transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 select-none pointer-events-none">
                      <Icon strokeWidth={0.5} style={{ color: accentColor }} />
                    </div>

                    {/* Meta Row */}
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-10 relative z-10">
                      <div 
                         className="flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-text-primary/5 border border-border-glass backdrop-blur-md"
                      >
                         <Icon size={20} style={{ color: accentColor }} />
                         <span className="font-mono text-sm uppercase tracking-widest font-bold text-text-primary/80">
                           {item.period}
                         </span>
                      </div>
                      <span
                        className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold"
                        style={{ color: accentColor }}
                      >
                        {item.type}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-primary group-hover:to-text-primary/50 transition-colors duration-500">
                        {item.role}
                      </h3>
                      <h4 className="font-mono text-lg text-text-muted mb-8 tracking-wide border-l-2 pl-4" style={{ borderColor: accentColor }}>
                        {item.company}
                      </h4>
                      <p className="font-body text-base md:text-xl text-text-secondary leading-relaxed font-light mb-12 flex-1">
                        {item.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-3 mt-auto pt-8 border-t border-border-glass">
                        {item.tech.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] px-4 py-2 bg-gradient-to-br from-text-primary/5 to-transparent border border-border-glass rounded-xl text-text-muted hover:text-text-primary hover:border-text-primary/30 transition-all duration-300 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

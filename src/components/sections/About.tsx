"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Code, Shield, Rocket } from "lucide-react";
import { PERSONAL, STATS, IDENTITY_BLOCKS } from "@/lib/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlassCard from "@/components/ui/GlassCard";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  brain: Brain,
  code: Code,
  shield: Shield,
  rocket: Rocket,
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: titleRef, isInView: titleVisible } = useInView<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bio lines cinematic fade up
      const bioLines = sectionRef.current?.querySelectorAll(".bio-line");
      if (bioLines) {
        gsap.from(bioLines, {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: bioLines[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-36 md:py-48 overflow-hidden"
    >
      {/* Dynamic Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-secondary/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }} className="relative z-10">
        
        {/* Section Label */}
        <div ref={titleRef} className="mb-16 md:mb-24 flex justify-center">
          <motion.div
            className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            initial={{ y: 20, opacity: 0 }}
            animate={titleVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-sm md:text-base font-bold uppercase tracking-[0.3em] text-accent-primary text-glow drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              01 — The Maker
            </span>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════
            PREMIUM GLASSMORPHIC BIO CONTAINER
            ════════════════════════════════════════════════ */}
        <div className="mb-32 perspective-[1000px]">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="neon-border rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            <GlassCard className="p-10 md:p-16 lg:p-24 relative overflow-hidden group border-border-glass bg-bg-tertiary/60 hover:bg-text-primary/[0.03] transition-colors duration-700">
              
              {/* Internal Decorative Glows */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 group-hover:bg-accent-secondary/30 transition-all duration-1000" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-primary/20 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 group-hover:bg-accent-primary/30 transition-all duration-1000" />

              {/* Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none">
                <span className="font-display text-[20rem] font-black tracking-tighter mix-blend-overlay">IH</span>
              </div>

              {/* Text Layout */}
              <div className="relative z-10 max-w-5xl mx-auto space-y-12">
                {PERSONAL.bio.map((line, i) => (
                  <p
                    key={i}
                    className="bio-line font-body text-xl md:text-3xl lg:text-4xl text-text-primary/90 leading-normal font-light tracking-wide text-center drop-shadow-md"
                  >
                    {/* Highlight key phrases by detecting 'Inayat', 'Full Stack', 'GenAI' etc. (Very basic string replacement simulation via styling, or just render the line) */}
                    {line}
                  </p>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════
            STATS & IDENTITY BLOCKS (Stable layouts)
            ════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="neon-border rounded-[2rem]"
            >
              <GlassCard className="p-8 md:p-10 text-center flex flex-col justify-center items-center h-full hover:bg-white/5 border-white/5">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 block mb-4 drop-shadow-lg"
                />
                <span className="font-mono text-xs md:text-sm text-accent-primary uppercase tracking-[0.2em] font-semibold text-glow drop-shadow-sm">
                  {stat.label}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Identity Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-6">
          {IDENTITY_BLOCKS.map((block, i) => {
            const IconComponent = ICON_MAP[block.icon];
            return (
              <motion.div
                 key={block.label}
                 initial={{ y: 40, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
               >
                 <GlassCard className="p-8 group h-full flex flex-col justify-between hover:border-accent-primary/40 border-white/5 transition-all duration-500 rounded-2xl" data-cursor="button">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent-primary/10 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-500 border border-white/10 group-hover:border-accent-primary/30">
                     <IconComponent size={24} className="text-accent-primary drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                   </div>
                   <div>
                     <h3 className="font-display font-bold text-xl text-text-primary mb-3 tracking-wide group-hover:text-accent-primary transition-colors">
                       {block.label}
                     </h3>
                     <p className="font-mono text-sm text-text-muted leading-relaxed font-light">
                       {block.detail}
                     </p>
                   </div>
                 </GlassCard>
               </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink, Calendar, Building2, Fingerprint } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import HighlightSwipe from "@/components/ui/HighlightSwipe";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import TextScramble from "@/components/ui/TextScramble";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = CERTIFICATIONS.find((c) => c.featured);
  const others = CERTIFICATIONS.filter((c) => !c.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a staggered fade-up for each timeline item
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item: any, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 md:py-40 overflow-hidden"
    >
      {/* Background Marquee Strips */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-[0.02] pointer-events-none rotate-3 scale-110">
        <MarqueeStrip
          items={CERTIFICATIONS.map((c) => c.title)}
          direction="left"
          className="font-display text-8xl md:text-9xl font-bold leading-none py-4"
          separator=" ★ "
        />
        <MarqueeStrip
          items={["Verified Skills", "Industry Standard", "Continuous Learning", "Mastery"]}
          direction="right"
          className="font-mono text-5xl md:text-6xl uppercase tracking-widest leading-none py-12"
          separator=" // "
        />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }} className="relative z-10">
        {/* Header */}
        <div className="mb-24 text-center">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-accent-secondary mb-4 block inline-block py-1 px-4 border border-accent-secondary/30 rounded-full bg-accent-secondary/10">
            05 — Certifications
          </span>
          <h2
            className="font-display font-extrabold text-text-primary mt-6 tracking-tight"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
          >
            <HighlightSwipe color="var(--accent-secondary)">
              Proof of Work
            </HighlightSwipe>
          </h2>
        </div>

        {/* Featured Certificate - Hero Style */}
        <div className="mb-32">
          {featured && (
            <div className="relative z-20 mx-auto max-w-5xl">
              <GlassCard
                className="p-8 md:p-14 rounded-3xl border-accent-secondary/40 relative overflow-hidden group"
                glowColor="rgba(139, 92, 246, 0.2)"
              >
                {/* Immersive background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 via-transparent to-accent-primary/10 opacity-50 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent-secondary/30 via-accent-primary/20 to-accent-secondary/30 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none -z-10" />

                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                  {/* Left: Enhanced Thumbnail */}
                  <div className="w-full lg:w-[45%] aspect-[4/3] rounded-2xl relative overflow-hidden ring-2 ring-white/10 shrink-0 transform transition-transform duration-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:rotate-1">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-bg-primary">
                        <Award size={80} className="text-accent-secondary opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-80" />
                    
                    {/* Overlay Badge */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                      <div className="w-14 h-14 shrink-0 rounded-full bg-accent-secondary text-white flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                         <Award size={28} />
                      </div>
                      <div className="flex-1 min-w-0">
                         <span className="font-mono text-[10px] text-bg-primary/70 uppercase tracking-widest block">Featured</span>
                         <span className="font-display font-bold text-bg-primary text-lg leading-tight block truncate md:whitespace-normal break-words">{featured.issuer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 w-full flex flex-col justify-center">
                    <div className="mb-6 md:mb-8">
                      <h3 className="font-display text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 leading-tight mb-4">
                        <TextScramble text={featured.title} play={true} speed={40} />
                      </h3>

                      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 font-mono text-xs md:text-sm text-text-muted bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-accent-secondary" /> Issued {featured.date}
                        </div>
                        {featured.credentialId && featured.credentialId !== "N/A" && (
                           <div className="flex items-center gap-2">
                              <Fingerprint size={16} className="text-accent-secondary" /> ID: {featured.credentialId}
                           </div>
                        )}
                      </div>
                    </div>

                    <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed mb-8 md:mb-10">
                      {featured.description}
                    </p>

                    <div className="mb-10 md:mb-12">
                      <h4 className="font-mono text-[10px] md:text-xs text-text-muted uppercase tracking-widest mb-3 md:mb-4">Core Skills Authorized</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {featured.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-accent-secondary/20 to-accent-secondary/5 border border-accent-secondary/30 text-bg-primary rounded-lg font-mono text-[10px] md:text-xs tracking-wider shadow-[0_0_15px_rgba(139,92,246,0.1)] mb-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={featured.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 w-full sm:w-max px-6 md:px-8 py-4 bg-accent-secondary text-bg-primary font-display font-semibold text-xs md:text-sm uppercase tracking-widest rounded-full hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1 relative z-20"
                      data-cursor="button"
                    >
                      Verify Credential <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>

        {/* Cinematic Spatial 3D Grid for Other Certificates */}
        <div className="relative mx-auto mt-32 lg:mt-48 perspective-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-32 gap-x-16 auto-rows-min pb-24 relative z-10 w-full">
            {others.map((cert, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div 
                  key={cert.title} 
                  className={`relative w-full group ${!isEven ? 'lg:mt-32' : 'lg:mt-0'}`}
                  initial={{ opacity: 0, y: 100, rotateX: 15, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.1
                  }}
                >
                  <GlassCard className="p-8 md:p-10 transition-all duration-700 bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/20 transform hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] h-full flex flex-col overflow-hidden relative rounded-3xl z-10 hover:z-50">
                    
                    {/* Decorative giant background logo/badge inside card */}
                    <div className="absolute -right-8 -bottom-8 text-[150px] opacity-[0.02] select-none pointer-events-none transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                        {cert.badge}
                    </div>

                    {/* Top: Header Row */}
                    <div className="flex items-start justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-5 flex-1 min-w-0 pr-4">
                          <div className="w-16 h-16 shrink-0 rounded-2xl bg-text-primary/5 border border-border-glass flex items-center justify-center shadow-inner group-hover:border-accent-primary/40 transition-colors backdrop-blur-md">
                              <span className="text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{cert.badge}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-text-primary group-hover:text-accent-primary transition-colors leading-tight truncate md:whitespace-normal break-words">
                                {cert.title}
                              </h3>
                              <div className="font-mono text-sm text-text-muted mt-2 flex items-center gap-2 font-semibold">
                                  <Building2 size={14} className="text-accent-primary/60 shrink-0" /> <span className="truncate">{cert.issuer}</span>
                              </div>
                          </div>
                        </div>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full flex items-center justify-center text-text-dim hover:text-text-primary hover:bg-accent-primary/20 transition-all border border-transparent hover:border-accent-primary/30 shrink-0 bg-text-primary/5"
                          aria-label={`View ${cert.title} credential`}
                        >
                          <ExternalLink size={20} />
                        </a>
                    </div>

                    {/* Credentials Data */}
                    <div className="flex flex-wrap gap-4 mb-8 relative z-10">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary bg-text-primary/5 px-4 py-2 rounded-xl flex items-center gap-2 border border-border-glass backdrop-blur-sm shadow-inner group-hover:border-accent-primary/20 transition-colors">
                          <Calendar size={14} className="text-accent-primary/70" /> {cert.date}
                        </span>
                        {cert.credentialId && cert.credentialId !== "N/A" && (
                          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary bg-text-primary/5 px-4 py-2 rounded-xl flex items-center gap-2 border border-border-glass backdrop-blur-sm shadow-inner group-hover:border-accent-secondary/20 transition-colors">
                              <Fingerprint size={14} className="text-accent-secondary/70" /> ID: {cert.credentialId}
                          </span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="font-body text-base md:text-lg text-text-muted leading-relaxed mb-10 flex-1 relative z-10 font-light">
                        {cert.description}
                    </p>

                    {/* Skills Drawer */}
                    <div className="relative z-10 pt-8 border-t border-white/5 mt-auto">
                        <h4 className="font-mono text-[11px] text-text-dim uppercase tracking-[0.3em] font-bold mb-4">Core Competencies</h4>
                        <div className="flex flex-wrap gap-3">
                        {cert.skills.map((skill) => (
                          <span
                              key={skill}
                              className="text-xs font-mono text-text-secondary px-4 py-2 bg-gradient-to-r from-text-primary/5 to-transparent border border-border-glass rounded-xl hover:text-text-primary hover:border-text-primary/30 transition-all cursor-default shadow-sm"
                          >
                              {skill}
                          </span>
                        ))}
                        </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

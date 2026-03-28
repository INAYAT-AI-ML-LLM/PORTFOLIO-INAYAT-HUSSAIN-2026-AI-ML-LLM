"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import TextScramble from "@/components/ui/TextScramble";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={cardRef}
      className="project-panel min-w-[100vw] w-screen h-full flex items-center justify-center px-6 md:px-16 shrink-0 relative"
    >
      {/* Background glow specific to project color */}
      <div 
        className="absolute inset-0 opacity-20 blur-[150px] mix-blend-screen pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${project.color}, transparent 60%)` }}
      />
      
      <div ref={inViewRef} className="max-w-7xl w-full grid md:grid-cols-[55%_45%] gap-12 md:gap-20 items-center relative z-10">
        {/* Image */}
        <motion.div
          className="relative rounded-2xl overflow-hidden aspect-[16/10] group neon-border p-1"
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full h-full relative rounded-xl overflow-hidden glass-card">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 mix-blend-overlay opacity-60 transition-opacity duration-500 group-hover:opacity-0"
              style={{
                background: `linear-gradient(135deg, ${project.color}30, #111111)`,
              }}
            />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
            <MagneticButton>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-[0.2em] flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all"
                style={{ color: project.color, textShadow: `0 0 10px ${project.color}` }}
                data-cursor="button"
              >
                View Project <ExternalLink size={16} />
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Info */}
        <div className="space-y-8">
          {/* Number */}
          <span
            className="font-display text-[8rem] md:text-[12rem] font-bold block leading-none select-none opacity-20 drop-shadow-2xl translate-y-8"
            style={{ color: project.color, WebkitTextStroke: `2px ${project.color}` }}
          >
            {project.number}
          </span>

          {/* Title */}
          <h3 className="font-display text-4xl md:text-6xl font-extrabold text-text-primary drop-shadow-md relative z-10">
            <TextScramble text={project.title} play={isInView} speed={30} />
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 relative z-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full glass-card font-mono text-[10px] md:text-xs uppercase tracking-widest border text-text-primary"
                style={{ borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed font-light relative z-10">
            {project.description}
          </p>

          <div className="flex items-center gap-6 relative z-10 pt-4">
            {/* Period */}
            <span className="font-mono text-xs md:text-sm text-text-dim uppercase tracking-widest">{project.period}</span>
            <div className="h-[1px] flex-1 bg-border-glass" />
            
            {/* CTA */}
            <div className="shrink-0">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider group/link text-text-primary"
                  data-cursor="link"
                  data-cursor-label="OPEN"
                >
                  GitHub
                  <span className="w-0 group-hover/link:w-8 h-[1px] transition-all duration-500" style={{ backgroundColor: project.color }} />
                  <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover:link:-translate-y-1 transition-transform" />
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref: titleRef, isInView: titleVisible } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // The container holds the first static title slide + all project panels
      if (!containerRef.current) return;

      gsap.to(containerRef.current, {
        x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (containerRef.current!.scrollWidth - window.innerWidth),
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden z-20 bg-[#050505]"
    >
      {/* Desktop: Horizontal Scroll */}
      {!isMobile ? (
        <div className="h-screen flex items-center w-full">
          <div ref={containerRef} className="flex h-full w-max flex-nowrap">
            {/* Entry card */}
            <div className="min-w-[100vw] w-screen h-full flex items-center justify-center px-6 shrink-0">
              <div ref={titleRef} className="text-center">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary block mb-4">
                  03 — Projects
                </span>
                <h2
                  className="font-display font-bold text-text-primary mb-4"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 8rem)",
                    WebkitTextStroke: "1px var(--text-dim)",
                    color: "transparent",
                  }}
                >
                  <TextScramble text="Selected Work" play={titleVisible} speed={30} />
                </h2>
                <p className="font-mono text-sm text-text-muted">
                  <span className="text-accent-primary">04</span> PROJECTS •{" "}
                  <span className="text-text-dim">
                    Real products. Real impact. Real code.
                  </span>
                </p>
              </div>
            </div>

            {/* Project panels */}
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      ) : (
        /* Mobile: Vertical Cards */
        <div className="py-32 px-6">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary block mb-4">
              03 — Projects
            </span>
            <h2
              className="font-display font-bold text-text-primary mb-2"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              Selected Work
            </h2>
            <p className="font-mono text-sm text-text-muted">
              04 Projects • Real products. Real code.
            </p>
          </div>

          <div className="max-w-lg mx-auto space-y-12">
            {PROJECTS.map((project, idx) => (
              <div key={project.id} className="relative">
                <motion.div
                  className="glass-card p-6 md:p-8 rounded-xl border border-white/5"
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Image */}
                  <div className="w-full aspect-video rounded-lg mb-6 relative overflow-hidden ring-1 ring-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}15, #11111188)`,
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border text-text-primary"
                        style={{
                          borderColor: `${project.color}30`,
                          backgroundColor: `${project.color}05`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg border transition-colors"
                    style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                </motion.div>
                
                {/* Divider Line between projects (except last) */}
                {idx !== PROJECTS.length - 1 && (
                  <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mt-16 mb-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

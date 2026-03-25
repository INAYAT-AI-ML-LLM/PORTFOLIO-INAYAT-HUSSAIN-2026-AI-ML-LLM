"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Mail, MapPin, ArrowUpRight, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import GlassCard from "@/components/ui/GlassCard";
import TextScramble from "@/components/ui/TextScramble";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      // Web3Forms — free email delivery service
      // The access_key is NOT secret (it's an alias to your email, per Web3Forms docs)
      // Get your key at https://web3forms.com — just enter your email
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // ← Replace with your Web3Forms key
          name,
          email,
          message,
          from_name: "Portfolio Contact Form",
          subject: `🚀 New Portfolio Message from ${name}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        formRef.current?.reset();
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-32 md:py-40 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden mix-blend-screen">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent-primary/20 blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-accent-secondary/20 blur-[120px] animate-pulse-glow" />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }} className="w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_600px] gap-16 lg:gap-20">
          {/* Header & Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              className="inline-flex items-center gap-4 mb-8"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-accent-primary text-glow">
                06 — Connect
              </span>
              <div className="h-[1px] w-24 bg-gradient-to-r from-accent-primary to-transparent" />
            </motion.div>

            <h2
              className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 drop-shadow-lg mb-8"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 1 }}
            >
              Let&apos;s build
              <br />
              <span className="text-text-muted italic animate-pulse">the future.</span>
            </h2>

            <p className="font-body text-lg md:text-xl text-text-secondary max-w-lg mb-16 font-light leading-relaxed">
              Whether you have a visionary project, a tricky technical problem,
              or just want to say hi, my inbox is always open.
            </p>

            <div className="space-y-8 mb-16">
              {/* Email */}
              <div className="flex items-center gap-6 group cursor-pointer" onClick={handleCopyEmail}>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-accent-primary/10 group-hover:border-accent-primary/50 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300">
                  <Mail size={24} className="text-text-muted group-hover:text-accent-primary transition-colors" />
                </div>
                <div>
                  <span className="font-mono text-xs text-text-dim uppercase tracking-[0.2em] font-bold block mb-1">
                    Direct Email
                  </span>
                  <button className="font-display text-2xl font-bold text-text-primary group-hover:text-accent-primary group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,1)] transition-all flex items-center gap-3">
                    {PERSONAL.email}
                    <Copy
                      size={18}
                      className={`transition-colors ${
                        copied ? "text-accent-success" : "text-text-dim group-hover:text-accent-primary"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-accent-secondary/10 group-hover:border-accent-secondary/50 group-hover:shadow-[0_0_20px_rgba(176,38,255,0.3)] transition-all duration-300">
                  <MapPin size={24} className="text-text-muted group-hover:text-accent-secondary transition-colors" />
                </div>
                <div>
                  <span className="font-mono text-xs text-text-dim uppercase tracking-[0.2em] font-bold block mb-1">
                    Location
                  </span>
                  <span className="font-display text-2xl font-bold text-text-primary group-hover:text-accent-secondary group-hover:drop-shadow-[0_0_8px_rgba(176,38,255,1)] transition-all">
                    {PERSONAL.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              {[
                { icon: Github, link: PERSONAL.socials.github, label: "GitHub" },
                { icon: Linkedin, link: PERSONAL.socials.linkedin, label: "LinkedIn" },
                { icon: Twitter, link: "https://x.com/", label: "Twitter" },
              ].map((social) => (
                <MagneticButton key={social.label}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-accent-primary hover:border-accent-primary hover:text-bg-primary hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all duration-300 group"
                    aria-label={social.label}
                    data-cursor="button"
                  >
                    <social.icon size={26} className="group-hover:scale-110 transition-transform" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="neon-border rounded-[2rem]">
              <GlassCard className="p-10 md:p-14 rounded-[2rem] border-t border-l border-white/20 bg-bg-primary/40 backdrop-blur-3xl shadow-2xl">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 border-transparent">
                  <div className="space-y-4 group">
                    <label htmlFor="name" className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent-primary transition-colors">
                      Name // Organization
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-xl font-display text-text-primary focus:border-accent-primary focus:outline-none transition-colors rounded-none placeholder:text-text-dim/30"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-4 group">
                    <label htmlFor="email" className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent-primary transition-colors">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-xl font-display text-text-primary focus:border-accent-primary focus:outline-none transition-colors rounded-none placeholder:text-text-dim/30"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-4 group">
                    <label htmlFor="message" className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent-primary transition-colors">
                      Message // Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-xl font-body text-text-primary focus:border-accent-primary focus:outline-none transition-colors rounded-none placeholder:text-text-dim/30 resize-none"
                      placeholder="Tell me about your vision..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full py-6 mt-4 bg-text-primary text-bg-primary font-display font-bold text-lg uppercase tracking-[0.2em] relative overflow-hidden group rounded-xl disabled:opacity-70 shadow-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
                    data-cursor="button"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        "Transmitting..."
                      ) : isSubmitted ? (
                        "Message Received"
                      ) : (
                        <>
                          Initiate Sequence <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {!isSubmitting && !isSubmitted && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[0.16,1,0.3,1]" />
                    )}
                  </button>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 font-mono text-sm text-center mt-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                      >
                        ⚠ {errorMsg}
                      </motion.p>
                    )}
                    {isSubmitted && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-accent-success font-mono text-sm text-center mt-4 px-4 py-3 bg-accent-success/10 border border-accent-success/20 rounded-xl"
                      >
                        ✓ Message sent successfully! I&apos;ll get back to you shortly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative">
          <div className="text-center md:text-left">
             <span className="font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary block mb-2 drop-shadow-md">
               {PERSONAL.monogram}.
             </span>
             <span className="font-mono text-xs text-text-dim uppercase tracking-[0.2em] font-bold">
               © {new Date().getFullYear()} All Rights Reserved.
             </span>
          </div>

          <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest text-center flex flex-col gap-2 items-center md:items-end">
            <span>Designed & Engineered by</span>
            <span className="text-text-secondary font-bold group hover:text-accent-primary transition-colors">
              Mohammad Inayat Hussain 
              <span className="inline-block translate-x-1 opacity-0 group-hover:opacity-100 transition-opacity">_</span>
            </span>
          </div>

          <MagneticButton>
            <button
              onClick={scrollToTop}
              className="w-16 h-16 rounded-full border border-border-glass flex items-center justify-center bg-text-primary/5 text-text-muted hover:text-bg-primary hover:bg-accent-primary hover:border-accent-primary hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 group"
              aria-label="Back to top"
              data-cursor="button"
            >
              <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

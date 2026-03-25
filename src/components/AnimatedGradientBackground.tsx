"use client";

import dynamic from "next/dynamic";

const ImmersiveScene = dynamic(() => import("@/components/three/ImmersiveScene"), {
  ssr: false,
});

export default function AnimatedGradientBackground() {
  return (
    <>
      {/* Load actual 3D Scene */}
      <ImmersiveScene />
      
      {/* Retain the grid pattern and scanlines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
}

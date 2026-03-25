"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function FloatingGeometries() {
  const { scrollYProgress } = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotates continuously
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;

      // React to scroll: push them up or down
      const currentScroll = scrollYProgress.get();
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, (currentScroll - 0.5) * 10, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 40 }).map((_, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={2}
          floatIntensity={3}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
          ]}
        >
          <mesh>
            {i % 3 === 0 ? <boxGeometry args={[0.5, 0.5, 0.5]} /> : i % 3 === 1 ? <octahedronGeometry args={[0.6]} /> : <torusGeometry args={[0.4, 0.1, 16, 32]} />}
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00e5ff" : "#b026ff"}
              wireframe
              emissive={i % 2 === 0 ? "#00e5ff" : "#b026ff"}
              emissiveIntensity={0.8}
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ImmersiveScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-bg-primary">
      {/* Fallback gradients behind 3D */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-primary/5 via-bg-primary to-bg-primary" />
      
      <Canvas eventSource={typeof document !== "undefined" ? document.getElementById("__next")! : undefined}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#00e5ff" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#b026ff" intensity={2} />

        <FloatingGeometries />
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
        
        <fog attach="fog" args={["#030303", 5, 25]} />
      </Canvas>
    </div>
  );
}

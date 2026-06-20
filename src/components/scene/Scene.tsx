"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { Flask3D } from "./Flask3D";
import { FloatingParticles } from "./FloatingParticles";
import { ScrollCamera } from "./ScrollCamera";

export function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        localClippingEnabled: true,
      }}
      camera={{ position: [0, 0.8, 5], fov: 45 }}
    >
      <Suspense fallback={null}>
        <Environment preset="night" />
        <ambientLight intensity={0.1} />
        <pointLight
          position={[0, -0.2, 0]}
          intensity={0.8}
          color="#c4e233"
          distance={3}
        />
        <pointLight position={[3, 2, 2]} intensity={0.3} color="#ffffff" />
        <ScrollCamera />
        <Flask3D />
        <FloatingParticles />
      </Suspense>
    </Canvas>
  );
}

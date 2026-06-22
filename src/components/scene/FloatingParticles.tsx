"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useScene } from "@/lib/store";

export function FloatingParticles() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame(() => {
    const { progress } = useScene.getState();
    ref.current.rotation.y += 0.0002;
    ref.current.rotation.x = progress * 0.1;
    (ref.current.material as THREE.PointsMaterial).opacity =
      0.3 + THREE.MathUtils.smoothstep(progress, 0.3, 0.7) * 0.5;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.3}
        color="#c4e233"
      />
    </Points>
  );
}

"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mouseState, scrollState } from "@/lib/scroll";

const FLASK_PROFILE = [
  [0, -0.55], [1.1, -0.55], [1.22, -0.4], [1.25, -0.15],
  [1.25, 0.15], [1.2, 0.35], [1.0, 0.6], [0.7, 0.82],
  [0.45, 0.98], [0.32, 1.12], [0.3, 1.25], [0.3, 1.82],
  [0.36, 1.88], [0.38, 1.92],
].map(([x, y]) => new THREE.Vector2(x, y));

const LIQUID_PROFILE = [
  [0, -0.52], [1.07, -0.52], [1.19, -0.38], [1.22, -0.13],
  [1.22, 0.13], [1.17, 0.33], [0.97, 0.58], [0.67, 0.8],
  [0.42, 0.96], [0.29, 1.1], [0.27, 1.23], [0.27, 1.8], [0, 1.8],
].map(([x, y]) => new THREE.Vector2(x, y));

const BUBBLES = [
  { startY: -0.4, speed: 0.35, x: 0.15, z: 0.1, size: 0.04, delay: 0 },
  { startY: -0.3, speed: 0.25, x: -0.3, z: 0.2, size: 0.035, delay: 1.2 },
  { startY: -0.35, speed: 0.4, x: 0.4, z: -0.15, size: 0.03, delay: 0.6 },
  { startY: -0.2, speed: 0.3, x: -0.1, z: -0.25, size: 0.045, delay: 2.0 },
  { startY: -0.45, speed: 0.28, x: 0.25, z: 0.3, size: 0.025, delay: 1.5 },
];

export function Flask3D() {
  const groupRef = useRef<THREE.Group>(null!);
  const liquidMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const glowLightRef = useRef<THREE.PointLight>(null!);
  const glowRingRef = useRef<THREE.Mesh>(null!);
  const bubbleRefs = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);

  const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.2), []);
  const glassGeo = useMemo(() => new THREE.LatheGeometry(FLASK_PROFILE, 24), []);
  const liquidGeo = useMemo(() => new THREE.LatheGeometry(LIQUID_PROFILE, 24), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const progress = scrollState.progress;
    const mouse = mouseState;

    const heroWeight = 1 - THREE.MathUtils.smoothstep(progress, 0.05, 0.2);
    const tiltX = mouse.x * 0.12 * heroWeight + Math.sin(progress * Math.PI * 2) * 0.05;
    const tiltZ = mouse.y * 0.08 * heroWeight;

    const g = groupRef.current;
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, tiltX, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tiltZ, 3, delta);
    g.rotation.y += 0.001;

    const liquidLevel = 0.2 + progress * 1.2;
    clipPlane.normal.set(Math.sin(tiltX * 2), -1, Math.sin(tiltZ * 2)).normalize();
    clipPlane.constant = liquidLevel;

    const highlight = Math.sin(progress * Math.PI) * 0.6;
    if (liquidMatRef.current) {
      liquidMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        liquidMatRef.current.emissiveIntensity, 0.2 + highlight * 0.3, 3, delta
      );
      liquidMatRef.current.opacity = THREE.MathUtils.damp(
        liquidMatRef.current.opacity, 0.45 + highlight * 0.15, 3, delta
      );
    }
    if (glowLightRef.current) {
      glowLightRef.current.intensity = THREE.MathUtils.damp(
        glowLightRef.current.intensity, 0.8 + highlight * 1.2, 3, delta
      );
    }
    if (glowRingRef.current) {
      glowRingRef.current.scale.setScalar(1 + highlight * 0.15);
      (glowRingRef.current.material as THREE.MeshBasicMaterial).opacity = 0.015 + highlight * 0.03;
    }

    for (let i = 0; i < BUBBLES.length; i++) {
      const mesh = bubbleRefs.current[i];
      if (!mesh) continue;
      const b = BUBBLES[i];
      const t = timeRef.current + b.delay;
      const range = liquidLevel - b.startY + 0.5;
      const y = b.startY + ((t * b.speed) % range);
      mesh.position.y = y;
      mesh.position.x = b.x + Math.sin(t * 2) * 0.05;
      const life = (y - b.startY) / range;
      mesh.scale.setScalar(b.size * (1 - life * 0.6));
      (mesh.material as THREE.MeshBasicMaterial).opacity = y < liquidLevel ? 0.5 : 0;
    }
  });

  return (
    <group ref={groupRef} position={[2.2, -0.5, -1]} scale={0.75}>
      <mesh geometry={glassGeo}>
        <meshBasicMaterial color="#c4e233" transparent opacity={0.04} side={THREE.FrontSide} />
      </mesh>

      <mesh geometry={glassGeo}>
        <meshBasicMaterial color="#c4e233" transparent opacity={0.03} wireframe side={THREE.FrontSide} />
      </mesh>

      <mesh geometry={liquidGeo}>
        <meshStandardMaterial
          ref={liquidMatRef}
          color="#c4e233"
          emissive="#c4e233"
          emissiveIntensity={0.2}
          transparent
          opacity={0.45}
          clippingPlanes={[clipPlane]}
          side={THREE.FrontSide}
        />
      </mesh>

      {BUBBLES.map((b, i) => (
        <mesh key={i} ref={(el) => { if (el) bubbleRefs.current[i] = el; }} position={[b.x, b.startY, b.z]}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color="#c4e233" transparent opacity={0.5} depthWrite={false} />
        </mesh>
      ))}

      <mesh ref={glowRingRef} position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 2.8, 16]} />
        <meshBasicMaterial color="#c4e233" transparent opacity={0.015} side={THREE.FrontSide} depthWrite={false} />
      </mesh>

      <pointLight ref={glowLightRef} position={[0, 0, 0]} intensity={0.8} color="#c4e233" distance={2.5} decay={2} />
    </group>
  );
}

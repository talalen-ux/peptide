"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "@/lib/store";

const FLASK_PROFILE = [
  [0, -0.55],
  [1.1, -0.55],
  [1.22, -0.4],
  [1.25, -0.15],
  [1.25, 0.15],
  [1.2, 0.35],
  [1.0, 0.6],
  [0.7, 0.82],
  [0.45, 0.98],
  [0.32, 1.12],
  [0.3, 1.25],
  [0.3, 1.82],
  [0.36, 1.88],
  [0.38, 1.92],
].map(([x, y]) => new THREE.Vector2(x, y));

const LIQUID_PROFILE = [
  [0, -0.52],
  [1.07, -0.52],
  [1.19, -0.38],
  [1.22, -0.13],
  [1.22, 0.13],
  [1.17, 0.33],
  [0.97, 0.58],
  [0.67, 0.8],
  [0.42, 0.96],
  [0.29, 1.1],
  [0.27, 1.23],
  [0.27, 1.8],
  [0, 1.8],
].map(([x, y]) => new THREE.Vector2(x, y));

function Bubble({
  startY,
  speed,
  x,
  z,
  size,
  delay,
}: {
  startY: number;
  speed: number;
  x: number;
  z: number;
  size: number;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const time = useRef(delay);

  useFrame((_, delta) => {
    time.current += delta;
    const { progress } = useScene.getState();
    const liquidLevel = 0.2 + progress * 1.2;
    const y = startY + ((time.current * speed) % (liquidLevel - startY + 0.5));
    if (y > liquidLevel) {
      time.current = delay;
    }
    ref.current.position.y = y;
    ref.current.position.x = x + Math.sin(time.current * 2) * 0.05;
    ref.current.scale.setScalar(
      size * (1 - (y - startY) / (liquidLevel - startY + 0.5) * 0.6)
    );
    const o = y < liquidLevel ? 0.6 : 0;
    (ref.current.material as THREE.MeshStandardMaterial).opacity = o;
  });

  return (
    <mesh ref={ref} position={[x, startY, z]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color="#c4e233"
        emissive="#c4e233"
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </mesh>
  );
}

export function Flask3D() {
  const groupRef = useRef<THREE.Group>(null!);
  const liquidRef = useRef<THREE.Mesh>(null!);
  const liquidMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const glowLightRef = useRef<THREE.PointLight>(null!);
  const glowRingRef = useRef<THREE.Mesh>(null!);

  const clipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.2),
    []
  );

  const glassGeo = useMemo(() => new THREE.LatheGeometry(FLASK_PROFILE, 48), []);
  const liquidGeo = useMemo(
    () => new THREE.LatheGeometry(LIQUID_PROFILE, 48),
    []
  );

  useFrame((_, delta) => {
    const { progress, mouse } = useScene.getState();

    const heroWeight = 1 - THREE.MathUtils.smoothstep(progress, 0.05, 0.2);
    const tiltX = mouse.x * 0.12 * heroWeight + Math.sin(progress * Math.PI * 2) * 0.05;
    const tiltZ = mouse.y * 0.08 * heroWeight;

    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      tiltX,
      3,
      1 / 60
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      tiltZ,
      3,
      1 / 60
    );
    groupRef.current.rotation.y += 0.001;

    const liquidLevel = 0.2 + progress * 1.2;
    clipPlane.normal
      .set(Math.sin(tiltX * 2), -1, Math.sin(tiltZ * 2))
      .normalize();
    clipPlane.constant = liquidLevel;

    // Scroll-driven highlight: subtle pulse that peaks mid-scroll
    const highlight = Math.sin(progress * Math.PI) * 0.6;
    if (liquidMatRef.current) {
      liquidMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        liquidMatRef.current.emissiveIntensity,
        0.2 + highlight * 0.3,
        3,
        delta
      );
      liquidMatRef.current.opacity = THREE.MathUtils.damp(
        liquidMatRef.current.opacity,
        0.45 + highlight * 0.15,
        3,
        delta
      );
    }
    if (glowLightRef.current) {
      glowLightRef.current.intensity = THREE.MathUtils.damp(
        glowLightRef.current.intensity,
        0.8 + highlight * 1.2,
        3,
        delta
      );
    }
    if (glowRingRef.current) {
      glowRingRef.current.scale.setScalar(1 + highlight * 0.15);
      (glowRingRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.015 + highlight * 0.03;
    }
  });

  const bubbles = useMemo(
    () => [
      { startY: -0.4, speed: 0.35, x: 0.15, z: 0.1, size: 0.04, delay: 0 },
      { startY: -0.3, speed: 0.25, x: -0.3, z: 0.2, size: 0.035, delay: 1.2 },
      { startY: -0.35, speed: 0.4, x: 0.4, z: -0.15, size: 0.03, delay: 0.6 },
      { startY: -0.2, speed: 0.3, x: -0.1, z: -0.25, size: 0.045, delay: 2.0 },
      { startY: -0.45, speed: 0.28, x: 0.25, z: 0.3, size: 0.025, delay: 1.5 },
      { startY: -0.25, speed: 0.32, x: -0.35, z: -0.1, size: 0.03, delay: 0.8 },
      { startY: -0.3, speed: 0.22, x: 0.0, z: 0.0, size: 0.05, delay: 3.0 },
    ],
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Glass shell */}
      <mesh geometry={glassGeo}>
        <meshPhysicalMaterial
          color="#d4e8c0"
          transparent
          opacity={0.08}
          roughness={0.02}
          metalness={0.05}
          side={THREE.DoubleSide}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* Glass edge highlight */}
      <mesh geometry={glassGeo}>
        <meshBasicMaterial
          color="#c4e233"
          transparent
          opacity={0.04}
          wireframe
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Liquid */}
      <mesh ref={liquidRef} geometry={liquidGeo}>
        <meshStandardMaterial
          ref={liquidMatRef}
          color="#c4e233"
          emissive="#c4e233"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          clippingPlanes={[clipPlane]}
          side={THREE.DoubleSide}
          clipShadows
        />
      </mesh>

      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}

      {/* Glow ring — subtle lime halo that pulses with scroll */}
      <mesh ref={glowRingRef} position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 2.8, 48]} />
        <meshBasicMaterial
          color="#c4e233"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow */}
      <pointLight
        ref={glowLightRef}
        position={[0, 0, 0]}
        intensity={1.5}
        color="#c4e233"
        distance={2.5}
        decay={2}
      />
    </group>
  );
}

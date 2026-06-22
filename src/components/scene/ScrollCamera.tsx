"use client";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "@/lib/store";

const PATH = [
  new THREE.Vector3(0, 0.8, 5),
  new THREE.Vector3(2.5, 1.2, 3.5),
  new THREE.Vector3(0, 1.8, 4.5),
  new THREE.Vector3(0, 0.5, 6),
];
const CURVE = new THREE.CatmullRomCurve3(PATH);

export function ScrollCamera() {
  const { camera } = useThree();

  useFrame(() => {
    const { progress, mouse } = useScene.getState();
    const p = CURVE.getPoint(progress);
    const heroWeight = 1 - THREE.MathUtils.smoothstep(progress, 0.05, 0.2);
    const parallax = new THREE.Vector3(
      mouse.x * 0.25 * heroWeight,
      mouse.y * 0.15 * heroWeight,
      0
    );
    camera.position.lerp(p.clone().add(parallax), 0.06);
    camera.lookAt(0, 0.3, 0);
  });

  return null;
}

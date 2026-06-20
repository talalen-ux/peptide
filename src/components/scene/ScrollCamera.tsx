"use client";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mouseState, scrollState } from "@/lib/scroll";

const PATH = [
  new THREE.Vector3(-1, 0.6, 5),
  new THREE.Vector3(0.5, 1.0, 4.5),
  new THREE.Vector3(-0.8, 1.2, 4),
  new THREE.Vector3(-0.5, 0.5, 5.5),
];
const CURVE = new THREE.CatmullRomCurve3(PATH);
const LOOK_AT = new THREE.Vector3(1, 0.2, 0);
const _target = new THREE.Vector3();
const _point = new THREE.Vector3();

export function ScrollCamera() {
  const { camera } = useThree();

  useFrame(() => {
    const progress = scrollState.progress;
    CURVE.getPoint(progress, _point);
    const heroWeight = 1 - THREE.MathUtils.smoothstep(progress, 0.05, 0.2);
    _target.set(
      _point.x + mouseState.x * 0.15 * heroWeight,
      _point.y + mouseState.y * 0.1 * heroWeight,
      _point.z
    );
    camera.position.lerp(_target, 0.06);
    camera.lookAt(LOOK_AT);
  });

  return null;
}

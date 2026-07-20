"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Bounds, Center, useGLTF } from "@react-three/drei";
import { MotionValue } from "framer-motion";

useGLTF.preload("/models/hoodie.glb");

export function HoodieModel({ rotation }: { rotation: MotionValue<number> }) {
  const { scene } = useGLTF("/models/hoodie.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.metalness = 0.1;
          mat.roughness = 0.8;
          mat.color.set("#000000");
        }
      });
    });
  }, [scene]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, rotation.get(), 0.08);
  });

  return (
    <Bounds fit clip observe margin={1.3}>
      <group ref={groupRef}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </Bounds>
  );
}

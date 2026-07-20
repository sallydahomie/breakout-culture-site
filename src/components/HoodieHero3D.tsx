"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { HoodieModel } from "@/components/HoodieModel";

export function HoodieHero3D({ rotation }: { rotation: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ fov: 32, position: [0, 0, 6] }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <hemisphereLight args={["#f4ede0", "#1a1613", 0.9]} />
      <ambientLight intensity={0.4} color="#f4ede0" />
      <directionalLight position={[3, 4, 5]} intensity={1.7} color="#e8c988" />
      <directionalLight position={[-4, 1, -3]} intensity={0.5} color="#5a3a2a" />
      <directionalLight position={[0, -3, 3]} intensity={0.3} color="#c9a961" />
      <Suspense fallback={null}>
        <HoodieModel rotation={rotation} />
      </Suspense>
    </Canvas>
  );
}

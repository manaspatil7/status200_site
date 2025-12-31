import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const particleCount = 3000;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.02;
    ref.current.rotation.y = time * 0.03;
    
    // Subtle mouse influence
    const targetX = mouseRef.current.x * 0.1;
    const targetY = mouseRef.current.y * 0.1;
    ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.01;
    ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  const orb3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(time * 0.3) * 3;
      orb1Ref.current.position.y = Math.cos(time * 0.2) * 2;
      orb1Ref.current.position.z = Math.sin(time * 0.4) * 2;
    }
    
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(time * 0.25) * 4;
      orb2Ref.current.position.y = Math.sin(time * 0.35) * 2.5;
      orb2Ref.current.position.z = Math.cos(time * 0.3) * 3;
    }
    
    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.sin(time * 0.2 + 2) * 3.5;
      orb3Ref.current.position.y = Math.cos(time * 0.3 + 1) * 2;
      orb3Ref.current.position.z = Math.sin(time * 0.25 + 3) * 2.5;
    }
  });

  return (
    <>
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#00a3cc" transparent opacity={0.25} />
      </mesh>
      <mesh ref={orb3Ref}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <ParticleField />
          <FloatingOrbs />
        </Suspense>
      </Canvas>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(220_20%_4%/0.6)_70%)] pointer-events-none" />
    </div>
  );
}

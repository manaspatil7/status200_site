import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const particleCount = 5000;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution for more depth
      const radius = Math.random() * 15 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;
      
      // Gradient colors: cyan to teal
      const t = Math.random();
      colors[i * 3] = 0 + t * 0.1;     // R
      colors[i * 3 + 1] = 0.7 + t * 0.3; // G
      colors[i * 3 + 2] = 0.9 + t * 0.1; // B
    }
    return { positions, colors };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.015 + mousePosition.y * 0.1;
    ref.current.rotation.y = time * 0.02 + mousePosition.x * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const orbs = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (orbs.current) {
      orbs.current.children.forEach((orb, i) => {
        const offset = i * 2.1;
        orb.position.x = Math.sin(time * 0.2 + offset) * 4;
        orb.position.y = Math.cos(time * 0.25 + offset) * 3;
        orb.position.z = Math.sin(time * 0.15 + offset) * 2 - 2;
        
        // Pulsing scale
        const scale = 1 + Math.sin(time * 0.5 + offset) * 0.2;
        orb.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={orbs}>
      {/* Primary orb - bright cyan */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.15} />
      </mesh>
      
      {/* Secondary orb - teal */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#00bcd4" transparent opacity={0.12} />
      </mesh>
      
      {/* Tertiary orb - blue */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#0097a7" transparent opacity={0.1} />
      </mesh>
      
      {/* Accent orb */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#4dd0e1" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.getElapsedTime() * 0.5) % 2;
    }
  });

  return (
    <gridHelper
      ref={ref}
      args={[60, 60, '#00a3cc', '#003d4d']}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#0a0e14', 5, 30]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 5]} intensity={0.5} color="#00e5ff" />
          <ParticleField />
          <FloatingOrbs />
          <GridFloor />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(220_20%_4%/0.8)_70%)] pointer-events-none" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_hsl(220_20%_4%)_100%)] pointer-events-none" />
    </div>
  );
}

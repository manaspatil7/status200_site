import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Hook to detect mobile
function useIsMobileView() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// Main particle sphere that reacts to mouse movement - Spline-style
function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  
  const isMobile = useIsMobileView();
  // Reduce particle count on mobile by 92% for better performance
  const particleCount = isMobile ? 800 : 10000;
  
  const { positions, originalPositions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Create sphere distribution
      const radius = 3 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      // White color with slight variations
      const brightness = 0.7 + Math.random() * 0.3;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness;
      colors[i * 3 + 2] = brightness;
      
      sizes[i] = 0.04 + Math.random() * 0.06;
    }
    
    return { positions, originalPositions, colors, sizes };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    // Only listen to mouse on desktop
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // On mobile, only do basic rotation - skip everything else
    if (isMobile) {
      pointsRef.current.rotation.y = time * 0.03;
      return;
    }
    
    // Desktop: Smooth mouse following
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;
    
    const mouse = mouseRef.current;
    
    // Rotate the entire sphere slowly
    pointsRef.current.rotation.y = time * 0.05;
    
    // Desktop: Animate individual particles with repulsion and glow
    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const colorArray = pointsRef.current.geometry.attributes.color.array as Float32Array;
    const sizeArray = pointsRef.current.geometry.attributes.size.array as Float32Array;
    
    // Convert mouse to 3D space (approximate)
    const mouseX = mouse.x * 4;
    const mouseY = mouse.y * 4;
    const repulsionRadius = 2.5; // Radius of effect
    const repulsionStrength = 1.5; // How strongly particles are pushed
    const glowRadius = 3.5; // Glow effect radius
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];
      
      // Wave distortion
      const waveX = Math.sin(time * 0.5 + oy * 0.5) * 0.08;
      const waveY = Math.cos(time * 0.4 + ox * 0.5) * 0.08;
      const waveZ = Math.sin(time * 0.3 + oz * 0.5) * 0.08;
      
      // Calculate distance from mouse in 3D (project mouse onto sphere surface)
      const dx = ox - mouseX;
      const dy = oy - mouseY;
      const dz = oz; // Mouse is at z=0 plane
      const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz * 0.3);
      
      // Repulsion effect - particles move away from cursor
      let repelX = 0;
      let repelY = 0;
      let repelZ = 0;
      
      if (distToMouse < repulsionRadius && distToMouse > 0.01) {
        const force = (1 - distToMouse / repulsionRadius) * repulsionStrength;
        const normalizedDist = distToMouse;
        
        repelX = (dx / normalizedDist) * force;
        repelY = (dy / normalizedDist) * force;
        repelZ = (dz / normalizedDist) * force * 0.5;
      }
      
      // Apply all transformations with smooth interpolation
      const targetX = ox + waveX + repelX;
      const targetY = oy + waveY + repelY;
      const targetZ = oz + waveZ + repelZ;
      
      // Smooth transition
      positionArray[i3] += (targetX - positionArray[i3]) * 0.1;
      positionArray[i3 + 1] += (targetY - positionArray[i3 + 1]) * 0.1;
      positionArray[i3 + 2] += (targetZ - positionArray[i3 + 2]) * 0.1;
      
      // Glow effect on hover - brighten particles near cursor
      if (distToMouse < glowRadius && distToMouse > 0.01) {
        const glowIntensity = (1 - distToMouse / glowRadius) * 0.6;
        const baseColor = 0.7 + Math.random() * 0.3;
        const glowColor = Math.min(1, baseColor + glowIntensity);
        
        colorArray[i3] = glowColor;
        colorArray[i3 + 1] = glowColor;
        colorArray[i3 + 2] = glowColor;
        
        // Slightly increase size for glow particles
        sizeArray[i] += glowIntensity * 0.02;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Inner glowing core
function GlowingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Pulsing scale
    const scale = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.setScalar(scale);
    
    // Slow rotation
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.z = time * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#0ea5e9"
        transparent
        opacity={0.05}
        wireframe
      />
    </mesh>
  );
}

// Outer ring particles
function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ringRef = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [radius]);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y = state.clock.getElapsedTime() * speed;
    ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <points ref={ringRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating ambient particles
function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = useIsMobileView();
  // Disable ambient particles on mobile for better performance
  const particleCount = isMobile ? 0 : 300;
  
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds[i] = 0.5 + Math.random() * 1.5;
    }
    
    return { positions, speeds };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positionArray[i3 + 1] += Math.sin(time * speeds[i] + i) * 0.002;
      
      // Wrap around
      if (positionArray[i3 + 1] > 10) positionArray[i3 + 1] = -10;
      if (positionArray[i3 + 1] < -10) positionArray[i3 + 1] = 10;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleBackground() {
  const isMobile = useIsMobileView();
  
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 14 : 8], fov: isMobile ? 45 : 60 }}
        dpr={isMobile ? 0.75 : [1, 2]}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          stencil: false,
          depth: !isMobile
        }}
        frameloop={isMobile ? "demand" : "always"}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#030712']} />
          <fog attach="fog" args={['#030712', isMobile ? 15 : 8, isMobile ? 35 : 25]} />
          
          <ambientLight intensity={isMobile ? 0.4 : 0.2} />
          {!isMobile && (
            <>
              <pointLight position={[10, 10, 10]} intensity={0.5} color="#0ea5e9" />
              <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
            </>
          )}
          
          <ParticleSphere />
          {!isMobile && <GlowingCore />}
          {!isMobile && (
            <>
              <OrbitRing radius={4.5} speed={0.15} color="#0ea5e9" />
              <OrbitRing radius={5} speed={-0.1} color="#8b5cf6" />
              <OrbitRing radius={5.5} speed={0.08} color="#ec4899" />
            </>
          )}
          {!isMobile && <AmbientParticles />}
        </Suspense>
      </Canvas>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(220_20%_4%/0.8)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

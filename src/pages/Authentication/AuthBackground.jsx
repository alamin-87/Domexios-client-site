import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const Petal = ({ index }) => {
  const mesh = useRef();
  const speed = useMemo(() => 0.05 + Math.random() * 0.1, []);
  const initialPos = useMemo(() => [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 10
  ], []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime() * speed;
    mesh.current.position.y -= speed;
    mesh.current.rotation.x = time * 2;
    mesh.current.rotation.y = time;
    mesh.current.position.x += Math.sin(time) * 0.01;
    
    if (mesh.current.position.y < -12) {
      mesh.current.position.y = 12;
      mesh.current.position.x = (Math.random() - 0.5) * 20;
    }
  });

  return (
    <mesh ref={mesh} position={initialPos}>
      <circleGeometry args={[0.15, 6]} />
      <meshStandardMaterial 
        color="#fbcfe8" // Soft Sakura Pink
        side={THREE.DoubleSide} 
        transparent 
        opacity={0.6}
        roughness={0.5}
      />
    </mesh>
  );
};

const abstractBuildingColors = ["#1e293b", "#334155", "#475569", "#64748b"];

const BuildingBlock = ({ position, args, color }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <boxGeometry args={args} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.1} 
          transparent 
          opacity={0.3}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
};

const BuildingStructure = () => {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
        group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -2, -5]}>
       <BuildingBlock position={[-1.5, 3, 0]} args={[1, 6, 1]} color={abstractBuildingColors[0]} />
       <BuildingBlock position={[1.5, 4, -1]} args={[1.5, 8, 1.5]} color={abstractBuildingColors[1]} />
       <BuildingBlock position={[0, 2, 1.5]} args={[1, 4, 1]} color={abstractBuildingColors[2]} />
       <BuildingBlock position={[0, 5, -2]} args={[0.5, 10, 0.5]} color={abstractBuildingColors[3]} />
    </group>
  );
};

const AuthBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <fog attach="fog" args={["#f8fafc", 5, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        
        {/* Modernist Building Structure */}
        <BuildingStructure />
        
        {/* Floating Petals */}
        {Array.from({ length: 50 }).map((_, i) => (
          <Petal key={i} index={i} />
        ))}

        <Sphere args={[10, 32, 32]} scale={-1}>
            <MeshDistortMaterial
                color="#f8fafc"
                speed={1.5}
                distort={0.3}
                radius={1}
            />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default AuthBackground;

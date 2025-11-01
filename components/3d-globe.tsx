"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Icosahedron } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"

function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1, 4]}>
      <meshPhongMaterial color="#8B5CF6" wireframe={false} emissive="#6D28D9" emissiveIntensity={0.2} />
    </Icosahedron>
  )
}

export function Globe3D() {
  return (
    <Canvas className="w-full h-64" camera={{ position: [0, 0, 2.5], fov: 75 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <RotatingIcosahedron />
      <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
    </Canvas>
  )
}

"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box, Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"

function EncryptedVault() {
  const vaultRef = useRef<THREE.Group>(null)
  const lockRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (vaultRef.current) {
      vaultRef.current.rotation.y += 0.003
      vaultRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.1
    }

    if (lockRef.current) {
      lockRef.current.rotation.z += 0.01
      lockRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.3
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={vaultRef}>
      {/* Main vault box */}
      <Box args={[2, 2.5, 2]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color="#8B5CF6"
          emissive="#6D28D9"
          emissiveIntensity={0.3}
          shininess={100}
          wireframe={false}
        />
      </Box>

      {/* Lock shield */}
      <Box args={[1.2, 1.5, 0.3]} position={[0, -0.2, 1.1]}>
        <meshPhongMaterial color="#06B6D4" emissive="#0891B2" emissiveIntensity={0.4} shininess={120} />
      </Box>

      {/* Rotating lock mechanism */}
      <group ref={lockRef}>
        <Sphere args={[0.4, 32, 32]} position={[0, -0.2, 1.3]}>
          <meshPhongMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.6} shininess={150} />
        </Sphere>
      </group>

      {/* Encrypted data particles orbiting */}
      <group ref={particlesRef}>
        {[...Array(8)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.12, 16, 16]}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 2.5,
              Math.sin((i / 8) * Math.PI * 2) * 0.5,
              Math.sin((i / 8) * Math.PI * 2) * 1.5,
            ]}
          >
            <meshPhongMaterial color="#8B5CF6" emissive="#A78BFA" emissiveIntensity={0.8} shininess={100} />
          </Sphere>
        ))}
      </group>

      {/* Center tech core */}
      <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.7}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </Sphere>
    </group>
  )
}

export function EncryptedVault3D() {
  return (
    <Canvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#06B6D4" />
      <EncryptedVault />
      <OrbitControls
        autoRotate
        autoRotateSpeed={3}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  )
}

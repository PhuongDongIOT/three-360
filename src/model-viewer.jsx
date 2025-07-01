// src/components/GLBViewer.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ path, scale = 1 }) {
  const { scene } = useGLTF(path)
  return <primitive object={scene} scale={scale} />
}

export default function GLBViewer({ path = '/model.glb', scale = 1 }) {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [2, 2, 2], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Model path={path} scale={scale} />
        </Suspense>
        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}

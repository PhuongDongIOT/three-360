
import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Outlines, OrbitControls, Environment } from '@react-three/drei'
import { useControls } from 'leva'

export function Suzi({ outlines, ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf')
  useFrame((state, delta) => (ref.current.rotation.y += delta))
  return (
    <mesh castShadow receiveShadow ref={ref} geometry={nodes.Suzanne.geometry} material={materials['default']} {...props}>
      {outlines && <Outlines thickness={0.03} angle={0} />}
    </mesh>
  )
}
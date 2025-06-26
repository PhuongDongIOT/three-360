
import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Outlines, OrbitControls, Environment } from '@react-three/drei'
import { useControls } from 'leva'

export function Model({ outlines, ...props }) {
  const { nodes, materials, animations } = useGLTF('/jump-transformed.glb')
  const { ref, actions } = useAnimations(animations)
  useEffect(() => void actions.jump.reset().play(), [])
  return (
    <group {...props} ref={ref}>
      <primitive object={nodes.mixamorigHips}></primitive>
      <skinnedMesh castShadow receiveShadow geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton}>
        {outlines && <Outlines angle={0} thickness={1.1} color="black" />}
      </skinnedMesh>
    </group>
  )
}
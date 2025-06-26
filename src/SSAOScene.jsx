import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, Center, Decal, Text3D, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export function SSAOEffect() {
  const margin = 0.5
  const { width, height } = useThree((state) => state.viewport)
  return (
    <>
      <Center bottom right position={[-width / 2 + margin, height / 2 - margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json">
          top left
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Center top left position={[width / 2 - margin, -height / 2 + margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json">
          bottom right
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Center rotation={[-0.5, -0.25, 0]}>
        {/* <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          font="/Inter_Bold.json">
          {`DXMD`}
          <meshNormalMaterial />
        </Text3D> */}
        <Center position={[-1.25, 0, 0]}>
          <Chair position={[0, -0.5, 0]} rotation={[0, 0.5, 0]} />
        </Center>
      </Center>
    </>
  )
}

function Chair(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf')
  const chairRef = useRef()

  useFrame(() => {
    if (chairRef.current) {
      chairRef.current.rotation.y += 0.01
    }
  })
  return (
    <primitive
      ref={chairRef}
      object={scene}
      scale={[2, 2, 2]}
      {...props}
    />
  )
}
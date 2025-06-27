import { useTexture } from '@react-three/drei'
import { BackSide } from 'three'

export default function SkyBox() {
  const texture = useTexture('/assets/pano.jpg')

  return (
    <mesh userData={{ lensflare: 'no-occlusion' }} scale={[-1, 1, 1]}>
      <sphereGeometry castShadow={false} receiveShadow={false} args={[50, 60, 40]} />
      <meshBasicMaterial toneMapped={false} map={texture} side={BackSide} />
    </mesh>
  )
}

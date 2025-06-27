import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export function GroundImage() {
    const texture = useLoader(THREE.TextureLoader, '/assets/plane.png')

    return (
        <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 45]}>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial map={texture} transparent />
        </mesh>
    )
}

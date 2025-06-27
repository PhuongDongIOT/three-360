import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Sun() {
    const sunRef = useRef()

    useFrame(({ clock }) => {
        if (sunRef.current) {
            sunRef.current.rotation.y = clock.getElapsedTime() * 0.1
        }
    })

    return (
        <mesh ref={sunRef} position={[0, 5, -10]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial
                color="orange"
                emissive={new THREE.Color('yellow')}
                emissiveIntensity={5}
                toneMapped={false}
            />
        </mesh>
    )
}

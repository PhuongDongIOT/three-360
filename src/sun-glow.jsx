// SunWithBloom.jsx
import { useThree, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function SunWithBloom({ position }) {
    const { scene, camera } = useThree()
    const sunRef = useRef()

    useEffect(() => {
        sunRef.current.layers.set(1)        // Đặt mesh vào layer 1
        camera.layers.enable(1)             // Camera vẫn có thể render layer 1
    }, [camera])

    useFrame(() => {
        sunRef.current.rotation.y += 0.01
    })

    return (
        <>
            <mesh ref={sunRef} position={position}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="orange"
                    emissive="yellow"
                    emissiveIntensity={5}
                    toneMapped={false}
                />
            </mesh>

            <EffectComposer multisampling={0}>
                <Bloom
                    intensity={2}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    kernelSize={1}
                />
            </EffectComposer>
        </>
    )
}

import * as THREE from "three"
import { useRef } from "react"
import {  useFrame } from "@react-three/fiber"
import { Clouds, Cloud, Sky as SkyImpl, StatsGl } from "@react-three/drei"
import { useControls } from "leva"

export function CloudScene() {
    return (
        <group>
            {/* <StatsGl /> */}
            <Sky />
            <ambientLight intensity={Math.PI / 1.5} />
            <spotLight position={[0, 40, 0]} decay={0} distance={45} penumbra={1} intensity={50} />
            <spotLight position={[-20, 0, 10]} color="red" angle={0.15} decay={0} penumbra={-1} intensity={30} />
            <spotLight position={[20, -10, 10]} color="red" angle={0.2} decay={0} penumbra={-1} intensity={20} />
        </group>
    )
}

function Sky() {
    const ref = useRef()
    const cloud0 = useRef()
    const { color, x, y, z, range, ...config } = {
        seed: { value: 40, min: 1, max: 100, step: 1 },
        segments: { value: 10, min: 1, max: 80, step: 1 },
        volume: { value: 10, min: 0, max: 100, step: 0.1 },
        opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
        fade: { value: 215, min: 0, max: 400, step: 1 },
        growth: { value: 16, min: 0, max: 20, step: 1 },
        speed: { value: 1, min: 0, max: 1, step: 0.01 },
        x: { value: 300, min: -200, max: 300, step: 1 },
        y: { value: 300, min: -200, max: 300, step: 1 },
        z: { value: 300, min: -200, max: 300, step: 1 },
        color: "white",
    }
    useFrame((state, delta) => {
        ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 2
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 2
        cloud0.current.rotation.y -= delta
    })
    return (
        <>
            {/* <SkyImpl /> */}
            <group ref={ref}>
                <Clouds material={THREE.MeshLambertMaterial} limit={100} range={range}>
                    <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={color} />
                    {/* <Cloud {...config} bounds={[x, y, z]} color="#eed0d0" seed={2} position={[15, 0, 0]} />
                    <Cloud {...config} bounds={[x, y, z]} color="#d0e0d0" seed={3} position={[-15, 0, 0]} />
                    <Cloud {...config} bounds={[x, y, z]} color="#a0b0d0" seed={4} position={[0, 0, -12]} />
                    <Cloud {...config} bounds={[x, y, z]} color="#c0c0dd" seed={5} position={[0, 0, 12]} /> */}
                    <Cloud concentrate="inside" growth={2} color="#ffccdd" opacity={1} seed={0.3} bounds={200} volume={150} />
                </Clouds>
            </group>
        </>
    )
}

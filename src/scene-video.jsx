import * as THREE from 'three'
import { forwardRef, useState, Suspense, useMemo, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useVideoTexture, Grid, Center, AccumulativeShadows, RandomizedLight, Environment, useGLTF, CameraControls } from '@react-three/drei'
import { useControls, button } from 'leva'
import { suspend } from 'suspend-react'
import CurvedPlane from './curved-plane'

const { DEG2RAD } = THREE.MathUtils

export default function SceneVideo() {
    return (
        <group>
            <Scene />

            {/* <Ground /> */}
            {/* <AccumulativeShadows frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
                <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
            </AccumulativeShadows> */}

            {/* <CameraControls /> */}
        </group>
    )
}

function Scene() {
    return (
        <group rotation-y={DEG2RAD * 0} opacity={0}>
            <Screen src={'/video.mp4'} />
        </group>
    )
}

function Screen({ src }) {

    const r = 16 / 9
    const width = 40
    const radius = 3.5
    const z = 6

    return (
        <Center top position-z={z}>
            <CurvedPlane width={width} height={width / r} radius={radius}>
                <Suspense fallback={<meshStandardMaterial side={THREE.DoubleSide} wireframe />}>
                    <VideoMaterial src={src} />
                </Suspense>
            </CurvedPlane>
        </Center>
    )
}

function VideoMaterial({ src }) {
    const texture = useVideoTexture(src)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.offset.x = 1

    return <meshStandardMaterial side={THREE.DoubleSide} map={texture} toneMapped={false} transparent opacity={0.9} />
}

//
//
//

function Ground() {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        fadeDistance: 30,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}

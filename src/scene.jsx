import * as THREE from 'three'
import { memo, useRef, forwardRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Grid, Center, AccumulativeShadows, RandomizedLight, Environment, useGLTF, CameraControls, useAnimations, Outlines, Backdrop } from '@react-three/drei'
import { useControls, button, buttonGroup, folder } from 'leva'
import { suspend } from 'suspend-react'

const city = import('@pmndrs/assets/hdri/city.exr')
const suzi = import(`@pmndrs/assets/models/suzi.glb`)

const { DEG2RAD } = THREE.MathUtils

export function Scene({ ...props }) {
    const { nodes, materials, animations } = useGLTF('/jump-transformed.glb')
    const { ref: meshRef, actions } = useAnimations(animations)
    useEffect(() => void actions.jump.reset().play(), [])
    const cameraControlsRef = useRef()

    const { camera } = useThree()

    // All same options as the original "basic" example: https://yomotsu.github.io/camera-controls/examples/basic.html
    // const { outlines, minDistance, enabled, verticalDragToForward, dollyToCursor, infinityDolly } = useControls({
    //     outlines: true,
    //     thetaGrp: buttonGroup({
    //         label: 'rotate theta',
    //         opts: {
    //             '+45º': () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
    //             '-90º': () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
    //             '+360º': () => cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true)
    //         }
    //     }),
    //     phiGrp: buttonGroup({
    //         label: 'rotate phi',
    //         opts: {
    //             '+20º': () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
    //             '-40º': () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true)
    //         }
    //     }),
    //     truckGrp: buttonGroup({
    //         label: 'truck',
    //         opts: {
    //             '(1,0)': () => cameraControlsRef.current?.truck(1, 0, true),
    //             '(0,1)': () => cameraControlsRef.current?.truck(0, 1, true),
    //             '(-1,-1)': () => cameraControlsRef.current?.truck(-1, -1, true)
    //         }
    //     }),
    //     dollyGrp: buttonGroup({
    //         label: 'dolly',
    //         opts: {
    //             '1': () => cameraControlsRef.current?.dolly(1, true),
    //             '-1': () => cameraControlsRef.current?.dolly(-1, true)
    //         }
    //     }),
    //     zoomGrp: buttonGroup({
    //         label: 'zoom',
    //         opts: {
    //             '/2': () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
    //             '/-2': () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true)
    //         }
    //     }),
    //     minDistance: { value: 0 },
    //     moveTo: folder(
    //         {
    //             vec1: { value: [3, 5, 2], label: 'vec' },
    //             'moveTo(…vec)': button((get) => cameraControlsRef.current?.moveTo(...get('moveTo.vec1'), true))
    //         },
    //         { collapsed: true }
    //     ),
    //     'fitToBox(mesh)': button(() => cameraControlsRef.current?.fitToBox(meshRef.current, true)),
    //     setPosition: folder(
    //         {
    //             vec2: { value: [-5, 2, 1], label: 'vec' },
    //             'setPosition(…vec)': button((get) => cameraControlsRef.current?.setPosition(...get('setPosition.vec2'), true))
    //         },
    //         { collapsed: true }
    //     ),
    //     setTarget: folder(
    //         {
    //             vec3: { value: [3, 0, -3], label: 'vec' },
    //             'setTarget(…vec)': button((get) => cameraControlsRef.current?.setTarget(...get('setTarget.vec3'), true))
    //         },
    //         { collapsed: true }
    //     ),
    //     setLookAt: folder(
    //         {
    //             vec4: { value: [1, 2, 3], label: 'position' },
    //             vec5: { value: [1, 1, 0], label: 'target' },
    //             'setLookAt(…position, …target)': button((get) => cameraControlsRef.current?.setLookAt(...get('setLookAt.vec4'), ...get('setLookAt.vec5'), true))
    //         },
    //         { collapsed: true }
    //     ),
    //     lerpLookAt: folder(
    //         {
    //             vec6: { value: [-2, 0, 0], label: 'posA' },
    //             vec7: { value: [1, 1, 0], label: 'tgtA' },
    //             vec8: { value: [0, 2, 5], label: 'posB' },
    //             vec9: { value: [-1, 0, 0], label: 'tgtB' },
    //             t: { value: Math.random(), label: 't', min: 0, max: 1 },
    //             'f(…posA,…tgtA,…posB,…tgtB,t)': button((get) => {
    //                 return cameraControlsRef.current?.lerpLookAt(
    //                     ...get('lerpLookAt.vec6'),
    //                     ...get('lerpLookAt.vec7'),
    //                     ...get('lerpLookAt.vec8'),
    //                     ...get('lerpLookAt.vec9'),
    //                     get('lerpLookAt.t'),
    //                     true
    //                 )
    //             })
    //         },
    //         { collapsed: true }
    //     ),
    //     saveState: button(() => cameraControlsRef.current?.saveState()),
    //     reset: button(() => cameraControlsRef.current?.reset(true)),
    //     enabled: { value: true, label: 'controls on' },
    //     verticalDragToForward: { value: false, label: 'vert. drag to move forward' },
    //     dollyToCursor: { value: false, label: 'dolly to cursor' },
    //     infinityDolly: { value: false, label: 'infinity dolly' }
    // })

    return (
        <>
            <group position-y={-0.5}>
                <Center top>
                    <group {...props} ref={meshRef} onClick={props.handleClick}>
                        <primitive object={nodes.mixamorigHips}></primitive>
                        <Backdrop
                            floor={0.25} // Stretches the floor segment, 0.25 by default
                            segments={20} // Mesh-resolution, 20 by default
                        >
                            <skinnedMesh castShadow receiveShadow geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton}>
                                <Outlines angle={0} thickness={1.1} color="black" />
                            </skinnedMesh>
                        </Backdrop>
                    </group>
                </Center>
                {/* <Ground /> */}
                {/* <Shadows /> */}
                <Environment files={suspend(city).default} />
            </group>
        </>
    )
}

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

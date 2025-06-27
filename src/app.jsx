import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, CameraControls, ContactShadows, useTexture } from '@react-three/drei'
import { Bloom, EffectComposer, SMAA, Vignette, LensFlare } from '@react-three/postprocessing'
import { Hotspot } from './hotspot.jsx'
import { Geometries } from './geometries.jsx'
import { Vector3 } from 'three'
import { useRef, useState } from 'react'
import PanoramaWithTransition from './panorama-with-transition.jsx'
import IconButtonGrid from './icon-button-grid.jsx'
import Modal from './modal.jsx'
import CarouselWithEffect from './carousel.jsx'
import MapComponent from './map-component.jsx'
import SettingGrid from './setting-grid.jsx'
import InfoCard from './info-card.jsx'
import { Scene } from './scene.jsx'
import SceneVideo from './scene-video.jsx'
import { BackgroundAudio } from './background-audio.jsx'
import { CloudScene } from './sky.jsx'
import * as THREE from 'three'
import { GroundImage } from './ground-image.jsx'
import { soundButton } from './sound-button.jsx'
import { folder, useControls } from 'leva'
import SkyBox from './sky-box.jsx'
import GlassSphere from './sphere-glass-materialtest.jsx'
import GalleryWithPreview from './gallery-with-preview.jsx'

const images = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
]

const images_another = [
    '/4.jpg',
    '/5.jpg',
    '/6.jpg',
]

export function App() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenMap, setIsOpenMap] = useState(false)
    const [isOpenSetting, setIsOpenSetting] = useState(false)
    const [isOpenInfo, setIsOpenInfo] = useState(false)
    const [currentImage, setCurrentImage] = useState('/assets/pano.jpg');
    const [list, setList] = useState(images)
    const controls = useRef()

    const { playSound } = soundButton({ url: '/click.wav' })
    const handleClick = (e) => {
        const position = e.object.position
        controls.current?.fitToBox(e.object, true) // Tự động xoay + zoom đến object
        // Hoặc dùng setLookAt
        // controls.current.setLookAt(0, 5, 10, position.x, position.y, position.z, true)
    }

    const buttons = [
        { icon: 'home', label: 'Trang chủ', onClick: () => { playSound(); } },
        {
            icon: 'info', label: 'Thông tin', onClick: () => {
                playSound();
                setIsOpenInfo(true);
            }
        },
        {
            icon: 'map', label: 'Bản đồ', onClick: () => {
                playSound();
                setIsOpenMap(true);
            }
        },
        {
            icon: 'camera', label: 'Hình ảnh', onClick: () => {
                playSound();
                setIsOpen(true);
            }
        },
        {
            icon: 'arrow', label: 'Cài đặt', onClick: () => {
                playSound();
                setIsOpenSetting(true);
            }
        },
    ]


    return (
        <div className='relative h-screen w-screen overflow-hidden'>
            <div className='h-screen w-screen overflow-hidden'>
                <Canvas shadows camera={{ position: [0, 0, 16], fov: 75 }}>
                    <AdaptiveDpr pixelated />
                    <AdaptiveEvents />
                    <ambientLight intensity={Math.PI / 2} />
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                    />
                    <PanoramaWithTransition image={currentImage} />
                    <group>
                        <Hotspot
                            position={new Vector3(0, 0, -500)}
                            label='🏠 Home'
                            color='blue'
                            onClick={() => {
                                controls.current?.setLookAt(
                                    0, 0, -300,    // Đặt camera ở đây
                                    0, 0, -500,       // Nhìn về origin hoặc object nào đó
                                    true
                                );
                                setTimeout(() => {
                                    setCurrentImage('/assets/pano2.jpg');
                                    setTimeout(() => {
                                        controls.current?.setLookAt(
                                            0, 0, 16,
                                            0, 0, 0,
                                            true
                                        );
                                    }, 500)
                                }, 200)
                            }}
                        />
                        <Hotspot
                            position={new Vector3(100, 0, -500)}
                            label='📷 Panorama'
                            color='pink'
                            onClick={() => {
                                controls.current?.setLookAt(
                                    0, 0, -300,    // Đặt camera ở đây
                                    0, 0, -500,       // Nhìn về origin hoặc object nào đó
                                    true
                                );
                                setTimeout(() => {
                                    setCurrentImage('/assets/pano.jpg');
                                    setTimeout(() => {
                                        controls.current?.setLookAt(
                                            0, 0, 16,
                                            0, 0, 0,
                                            true
                                        );
                                    }, 500)
                                }, 200)
                            }}
                        />
                    </group>
                    <group>
                        <hemisphereLight groundColor='red' />
                        <Geometries />
                    </group>
                    <group>
                        <Scene handleClick={handleClick} scale={0.02} position={[-1.25, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
                        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                        {/* <Environment background preset='dawn' blur={0.8} /> */}
                    </group>
                    <SceneVideo />
                    <CloudScene />
                    <GroundImage />
                    {/* <EffectComposer multisampling={false}>
                        <DirtLensFlare />
                        <Vignette />
                        <Bloom mipmapBlur radius="0.9" luminanceThreshold="0.966" intensity="2" levels="4" />
                        <SMAA />
                    </EffectComposer> */}
                    <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1} />
                    <CameraControls ref={controls} minDistance={5} maxDistance={500} />
                    {/* <GlassSphere scale={1} /> */}
                    <SkyBox />
                    <BackgroundAudio url='/music.mp3' />
                </Canvas>
            </div>
            <div className='fixed bottom-0 left-0 w-full'>
                <div className='max-w-4xl mx-auto'>
                    <IconButtonGrid buttons={buttons} />
                </div>
            </div>
            <Modal isOpen={isOpenInfo} onClose={() => setIsOpenInfo(false)}>
                <InfoCard />
            </Modal>
            <Modal isOpen={isOpenSetting} onClose={() => setIsOpenSetting(false)}>
                <SettingGrid />
            </Modal>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <GalleryWithPreview
                    list={list}
                    setList={setList}
                    imagesAnother={images_another}
                />
            </Modal>
            <Modal isOpen={isOpenMap} onClose={() => setIsOpenMap(false)}>
                <MapComponent />
            </Modal>
        </div>
    )
}

function DirtLensFlare(props) {
    const texture = useTexture('/lensDirtTexture.png')

    const lensFlareProps = useControls({
        LensFlare: folder(
            {
                enabled: { value: true, label: 'enabled?' },
                opacity: { value: 1.0, min: 0.0, max: 1.0, label: 'opacity' },
                position: { value: { x: -25, y: 6, z: -60 }, step: 1, label: 'position' },
                glareSize: { value: 0.35, min: 0.01, max: 1.0, label: 'glareSize' },
                starPoints: { value: 6.0, step: 1.0, min: 0, max: 32.0, label: 'starPoints' },
                animated: { value: true, label: 'animated?' },
                followMouse: { value: false, label: 'followMouse?' },
                anamorphic: { value: false, label: 'anamorphic?' },
                colorGain: { value: new THREE.Color(56, 22, 11), label: 'colorGain' },

                Flare: folder({
                    flareSpeed: { value: 0.4, step: 0.001, min: 0.0, max: 1.0, label: 'flareSpeed' },
                    flareShape: { value: 0.1, step: 0.001, min: 0.0, max: 1.0, label: 'flareShape' },
                    flareSize: { value: 0.005, step: 0.001, min: 0.0, max: 0.01, label: 'flareSize' }
                }),

                SecondaryGhosts: folder({
                    secondaryGhosts: { value: true, label: 'secondaryGhosts?' },
                    ghostScale: { value: 0.1, min: 0.01, max: 1.0, label: 'ghostScale' },
                    aditionalStreaks: { value: true, label: 'aditionalStreaks?' }
                }),

                StartBurst: folder({
                    starBurst: { value: true, label: 'starBurst?' },
                    haloScale: { value: 0.5, step: 0.01, min: 0.3, max: 1.0 }
                })
            },
            { collapsed: true }
        )
    })

    return <LensFlare {...lensFlareProps} lensDirtTexture={texture} />
}
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, CameraControls, ContactShadows, Environment, OrbitControls, useTexture } from '@react-three/drei'
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
import AudioPlayerWithPlaylist from './audio-player-with-playlist.jsx'
// import { Viewcube } from './view-cube.jsx'
import { useContext, createContext, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Hud, RenderTexture, OrthographicCamera, PerspectiveCamera, Text } from '@react-three/drei'
import { suspend } from 'suspend-react'
import IconButtonCol from './icon-button-col.jsx'
import VerticalEmblaCarousel from './vertical-embla-carousel.jsx'
import HorizontalEmblaCarousel from './horizontal-embla-carousel.jsx'
import VRScene from './vr-scene.jsx'

const medium = import('@pmndrs/assets/fonts/inter_medium.woff')
const context = createContext()


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
    const [isOpenCarousel, setIsOpenCarousel] = useState(false)
    const [isOpenCarouselCus, setIsOpenCarouselCus] = useState(false)
    const [isOpenVr, setIsOpenVr] = useState(false)
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

    const buttonsLeft = [
        { icon: 'home', label: 'Trang chủ', onClick: () => { playSound(); } },
        {
            icon: 'info', label: 'vị trí', onClick: () => {
                playSound();
                setIsOpenCarousel(true);
            }
        },
        {
            icon: 'map', label: 'Hình ảnh', onClick: () => {
                playSound();
                setIsOpenCarouselCus(true);
            }
        },
        {
            icon: 'camera', label: 'Hình ảnh', onClick: () => {
                playSound();
                setIsOpen(true);
            }
        },
        {
            icon: 'arrow', label: 'VR', onClick: () => {
                playSound();
                setIsOpenVr(true);
            }
        },
    ]



    return !isOpenVr ? (
        <div className='relative h-screen w-screen overflow-hidden'>
            <div className='h-screen w-screen overflow-hidden'>
                <Canvas>
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
                    {/* <SceneVideo /> */}
                    <CloudScene />
                    <GroundImage />
                    {/* <EffectComposer multisampling={false}>
                        <DirtLensFlare />
                        <Vignette />
                        <Bloom mipmapBlur radius="0.9" luminanceThreshold="0.966" intensity="2" levels="4" />
                        <SMAA />
                    </EffectComposer> */}
                    <ambientLight intensity={0.5 * Math.PI} />
                    {/* <Viewcube />
                    <OrbitControls />
                    <Environment preset="city" /> */}
                    <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1} />
                    <CameraControls ref={controls} minDistance={5} maxDistance={500} />
                    {/* <GlassSphere scale={1} /> */}
                    {/* <SkyBox /> */}
                    <OrbitControls />
                    <Environment preset="city" />
                </Canvas>
            </div>
            <div className='fixed top-0 left-0 w-16 h-full flex flex-col justify-center'>
                <IconButtonCol buttons={buttonsLeft} />
            </div>
            <div className='fixed bottom-0 left-0 w-full'>
                <div className='max-w-4xl mx-auto'>
                    <IconButtonGrid buttons={buttons} />
                </div>
            </div>
            <Modal isOpen={isOpenCarouselCus} onClose={() => setIsOpenCarouselCus(false)}>
                <div className='grid grid-cols-5 max-w-6xl h-[500px] gap-2 l:gap-4'>
                    <div className='col-span-1 flex flex-col gap-2'>
                        {images.map((item, index) => {
                            return (
                                <div className='h-24 w-full'>
                                    <img
                                        src={item}
                                        alt={`Slide ${index}`}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-span-4 mx-auto">
                        <HorizontalEmblaCarousel slides={images} />
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isOpenCarousel} onClose={() => setIsOpenCarousel(false)}>
                <div className='grid grid-cols-4 max-w-4xl w-full mxx-auto h-[500px]'>
                    <div className='col-span-3'>
                        <img src="/location.png" alt="" srcSet="" />
                    </div>
                    <div>
                        <VerticalEmblaCarousel slides={images} height={500} />
                    </div>
                </div>
            </Modal>
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
            <AudioPlayerWithPlaylist />
            {/* <BackgroundAudio src='/music.mp3' /> */}
        </div>
    ) :
        (
            <div className="h-screen w-screen">
                <VRScene />
            </div>
        )
}



function Torus(props) {
    const [hovered, hover] = useState(false)
    return (
        <mesh onPointerOver={(e) => hover(true)} onPointerOut={(e) => hover(false)} {...props}>
            <torusGeometry args={[1, 0.25, 32, 100]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function Viewcube({ renderPriority = 1, matrix = new THREE.Matrix4() }) {
    const mesh = useRef(null)
    const { camera, viewport } = useThree()
    const texture = useTexture('/assets/pano.jpg')

    useFrame(() => {
        // Spin mesh to the inverse of the default cameras matrix
        matrix.copy(camera.matrix).invert()
        mesh.current.quaternion.setFromRotationMatrix(matrix)
    })

    return (
        <Hud renderPriority={renderPriority}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <mesh ref={mesh} position={[viewport.width / 2, viewport.height / 2 - 0.5, 0]}>
                <sphereGeometry args={[0.7, 24, 24]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>
            <ambientLight intensity={1} />
            <pointLight position={[200, 200, 100]} intensity={0.5} />
        </Hud>
    )
}

const Box = forwardRef(({ children, ...props }, fref) => {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    useImperativeHandle(fref, () => ref.current, [])
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerMove={(event) => (event.stopPropagation(), hover(event.face.materialIndex))}
            onPointerOut={() => hover(false)}>
            <boxGeometry />
            <context.Provider value={hovered}>{children}</context.Provider>
        </mesh>
    )
})

function FaceMaterial({ children, index, ...props }) {
    const hovered = useContext(context)
    return (
        <meshStandardMaterial attach={`material-${index}`} color={hovered === index ? 'hotpink' : 'orange'} {...props}>
            <RenderTexture frames={6} attach="map" anisotropy={16}>
                <color attach="background" args={['white']} />
                <OrthographicCamera makeDefault left={-1} right={1} top={1} bottom={-1} position={[0, 0, 10]} zoom={0.5} />
                <Text font={suspend(medium).default} color="black">
                    {children}
                </Text>
            </RenderTexture>
        </meshStandardMaterial>
    )
}

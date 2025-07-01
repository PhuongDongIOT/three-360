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
import { CloudScene } from './sky.jsx'
import * as THREE from 'three'
import { GroundImage } from './ground-image.jsx'
import { soundButton } from './sound-button.jsx'
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
import TabWithGsap from './tab-with-gsap.jsx'
import VideoEmblaCarousel from './video-embla-carousel.jsx'
import VerticalTextScroll from './vertical-text-scroll.jsx'
import GalleryWithPreviewRoom from './gallery-with-preview-room.jsx'

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
    const [isOpenIntro, setIsOpenIntro] = useState(false)
    const [isOpenUtil, setIsOpenUtil] = useState(false)
    const [isOpenVideo, setIsOpenVideo] = useState(false)
    const [currentImage, setCurrentImage] = useState('/assets/pano.jpg');
    const [list, setList] = useState(images)
    const controls = useRef()

    const { playSound } = soundButton({ url: '/click.wav' })
    const buttons = [
        {
            icon: 'info', label: 'Thông tin', onClick: () => {
                playSound();
                setIsOpenInfo(true);
            }
        },
        {
            icon: 'arrow', label: 'Mô hình', onClick: () => {
                playSound();
                setIsOpenSetting(true);
            }
        },
        {
            icon: 'home', label: 'Video', onClick: () => {
                playSound();
                setIsOpenVideo(true);
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
    ]

    const buttonsLeft = [
        {
            icon: 'home', label: 'Giới thiệu', onClick: () => {
                playSound();
                setIsOpenIntro(true);
            }
        },
        {
            icon: 'info', label: 'vị trí', onClick: () => {
                playSound();
                setIsOpenCarousel(true);
            }
        },
        {
            icon: 'map', label: 'Tầng', onClick: () => {
                playSound();
                setIsOpenCarouselCus(true);
            }
        },
        {
            icon: 'camera', label: 'Tiện ích', onClick: () => {
                playSound();
                setIsOpenUtil(true);
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
                                    0, 0, -300,
                                    0, 0, -500,
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
                                    0, 0, -300,
                                    0, 0, -500,
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
                    <CloudScene />
                    <GroundImage />
                    <ambientLight intensity={0.5 * Math.PI} />
                    <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1} />
                    <CameraControls ref={controls} minDistance={5} maxDistance={500} />
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
            <Modal isOpen={isOpenIntro} onClose={() => setIsOpenIntro(false)}>
                <InfoCard />
            </Modal>
            <Modal isOpen={isOpenVideo} onClose={() => setIsOpenVideo(false)}>

                <VerticalTextScroll />
                <div className='flex relative'>
                    <VideoEmblaCarousel />
                    <div className="absolute sm:relative bottom-0 sm:top-0 right-0 max-w-[232px] rounded-xl shadow-inner bg-white/10 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none">
                        <div className="relative z-10 rounded-xl shadow-xl">
                            <div className="transition-all duration-500 rounded-t-xl p-2 lg:px-4 lg:pt-4 space-y-2 sm:space-y-4">
                                <div className="flex flex-col space-x-4">
                                    <video
                                        className="flex-none rounded-lg bg-slate-100 object-cover w-full"
                                        src="/video.mp4"
                                        muted
                                        loop
                                        playsInline
                                    />
                                    <div className="min-w-0 flex-auto space-y-1 font-semibold">
                                        <h2 className="text-white transition-all duration-500 text-sm leading-6 truncate">
                                            🎵 Nhạc
                                        </h2>
                                        <p className="text-white transition-all duration-500 sm:text-xs line-clamp-2 sm:line-clamp-4 md:line-clamp-none">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui incidunt quod consequuntur reprehenderit, nisi odio, dolorem quisquam possimus vero molestias repellendus, mollitia nihil corrupti commodi numquam deserunt vitae? Veritatis, tempora!
                                        </p>
                                    </div>
                                    <div className='hidden sm:grid sm:grid-cols-4 sm:mt-2'>
                                        {images.map((item, index) => {
                                            return (
                                                <div className='h-24 w-full'>
                                                    <img
                                                        src={item}
                                                        alt={`Slide ${index}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )
                                        })}
                                        {images.map((item, index) => {
                                            return (
                                                <div className='h-24 w-full'>
                                                    <img
                                                        src={item}
                                                        alt={`Slide ${index}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )
                                        })}
                                        {images.slice(0, 2).map((item, index) => {
                                            return (
                                                <div className='h-24 w-full'>
                                                    <img
                                                        src={item}
                                                        alt={`Slide ${index}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
            <Modal isOpen={isOpenCarouselCus} onClose={() => setIsOpenCarouselCus(false)}>
                <div className='grid grid-cols-5 max-w-6xl h-[500px] gap-2 l:gap-4'>
                    <div className='col-span-1 flex flex-col gap-2'>
                        {images.map((item, index) => {
                            return (
                                <div className='h-24 w-full'>
                                    <img
                                        src={item}
                                        alt={`Slide ${index}`}
                                        className="w-full h-full object-cover"
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
                <div className='grid grid-cols-4 max-w-6xl w-full mxx-auto h-[500px]'>
                    <div className='col-span-3'>
                        <img src="/location.png" alt="" srcSet="" />
                    </div>
                    <div>
                        <VerticalEmblaCarousel slides={images} height={500} />
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isOpenInfo} onClose={() => setIsOpenInfo(false)}>
                <TabWithGsap />
            </Modal>
            <Modal isOpen={isOpenSetting} onClose={() => setIsOpenSetting(false)}>
                <SettingGrid />
            </Modal>
            <Modal isOpen={isOpenUtil} onClose={() => setIsOpenUtil(false)}>
                <div>
                    <div className='flex mb-1 h-24 gap-2'>
                        <div className='h-24 w-full relative group'>
                            <img
                                src='/rooms/Mặt bằng căn hộ loại C.png'
                                className="w-full h-24 object-cover cursor-pointer"
                            />
                            <div className='absolute bottom-0 left-[50%] transform -translate-x-[50%]'>
                                <p className='text-[xx-small] lg:text-sm font-bold text-white w-32 text-center uppercase px-1 py-1 bg-gray-50/20 backdrop-blur-md hover:backdrop-blur-none groud-hover:backdrop-blur-none hover:bg-transparent groud-hover:bg-transparent rounded-t-xl overflow-hidden transition duration-200'>
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                        <div className='h-24 w-full relative group'>
                            <img
                                src='/rooms/Mặt bằng căn hộ loại C.png'
                                className="w-full h-24 object-cover cursor-pointer"
                            />
                            <div className='absolute bottom-0 left-[50%] transform -translate-x-[50%]'>
                                <p className='text-[xx-small] lg:text-sm font-bold text-white w-32 text-center uppercase px-1 py-1 bg-gray-50/20 backdrop-blur-md hover:backdrop-blur-none groud-hover:backdrop-blur-none hover:bg-transparent groud-hover:bg-transparent rounded-t-xl overflow-hidden transition duration-200'>
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                        <div className='h-24 w-full relative group'>
                            <img
                                src='/rooms/Mặt bằng căn hộ loại C.png'
                                className="w-full h-24 object-cover cursor-pointer"
                            />
                            <div className='absolute bottom-0 left-[50%] transform -translate-x-[50%]'>
                                <p className='text-[xx-small] lg:text-sm font-bold text-white w-32 text-center uppercase px-1 py-1 bg-gray-50/20 backdrop-blur-md hover:backdrop-blur-none groud-hover:backdrop-blur-none hover:bg-transparent groud-hover:bg-transparent rounded-t-xl overflow-hidden transition duration-200'>
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                        <div className='h-24 w-full relative group'>
                            <img
                                src='/rooms/Mặt bằng căn hộ loại C.png'
                                className="w-full h-24 object-cover cursor-pointer"
                            />
                            <div className='absolute bottom-0 left-[50%] transform -translate-x-[50%]'>
                                <p className='text-[xx-small] lg:text-sm font-bold text-white w-32 text-center uppercase px-1 py-1 bg-gray-50/20 backdrop-blur-md hover:backdrop-blur-none groud-hover:backdrop-blur-none hover:bg-transparent groud-hover:bg-transparent rounded-t-xl overflow-hidden transition duration-200'>
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                        <div className='h-24 w-full relative group'>
                            <img
                                src='/rooms/Mặt bằng căn hộ loại C.png'
                                className="w-full h-24 object-cover cursor-pointer"
                            />
                            <div className='absolute bottom-0 left-[50%] transform -translate-x-[50%]'>
                                <p className='text-[xx-small] lg:text-sm font-bold text-white w-32 text-center uppercase px-1 py-1 bg-gray-50/20 backdrop-blur-md hover:backdrop-blur-none groud-hover:backdrop-blur-none hover:bg-transparent groud-hover:bg-transparent rounded-t-xl overflow-hidden transition duration-200'>
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                    </div>
                    <GalleryWithPreviewRoom />
                </div>
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
    ) : (
        <div className="h-screen w-screen">
            <VRScene />
        </div>
    )
}

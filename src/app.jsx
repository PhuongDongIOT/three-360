import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Hotspot } from './hotspot.jsx'
import { Geometries } from './geometries.jsx'
import { Vector3 } from 'three'
import { useState } from 'react'
import PanoramaWithTransition from './panorama-with-transition.jsx'
import IconButtonGrid from './icon-button-grid.jsx'
import Modal from './modal.jsx'
import CarouselWithEffect from './carousel.jsx'
import MapComponent from './map-component.jsx'
import SettingGrid from './setting-grid.jsx'
import InfoCard from './info-card.jsx'

const images = [
    'https://picsum.photos/id/1011/800/400',
    'https://picsum.photos/id/1012/800/400',
    'https://picsum.photos/id/1013/800/400',
]

const images_another = [
    'https://picsum.photos/id/1013/800/400',
    'https://picsum.photos/id/1011/800/400',
    'https://picsum.photos/id/1012/800/400',
]


export function App() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenMap, setIsOpenMap] = useState(false)
    const [isOpenSetting, setIsOpenSetting] = useState(false)
    const [isOpenInfo, setIsOpenInfo] = useState(false)
    const [currentImage, setCurrentImage] = useState('/assets/pano.jpg');
    const [list, setList] = useState(images)

    const buttons = [
        { icon: 'home', label: 'Trang chủ', onClick: () => { } },
        { icon: 'info', label: 'Thông tin', onClick: () => setIsOpenInfo(true) },
        { icon: 'map', label: 'Bản đồ', onClick: () => setIsOpenMap(true) },
        { icon: 'camera', label: 'Hình ảnh', onClick: () => setIsOpen(true) },
        { icon: 'arrow', label: 'Cài đặt', onClick: () => setIsOpenSetting(true) },
    ]
    return (
        <div className='relative h-screen w-screen'>
            <div className='h-screen w-screen'>
                <Canvas camera={{ position: [0, 0, 22.5], fov: 75 }}>
                    <ambientLight intensity={Math.PI / 2} />
                    <PanoramaWithTransition image={currentImage} />
                    <Hotspot
                        position={new Vector3(0, 0, -500)}
                        label="🏠 Home"
                        color="blue"
                        onClick={() => setCurrentImage('/assets/pano2.jpg')}
                    />
                    <Hotspot
                        position={new Vector3(100, 0, -500)}
                        label="📷 Panorama"
                        color="pink"
                        onClick={() => setCurrentImage('/assets/pano.jpg')}
                    />
                    <Hotspot
                        position={new Vector3(0, 100, -500)}
                        label="📷 Gallery"
                        color="pink"
                        onClick={() => alert('Clicked Gallery')}
                    />
                    <Hotspot
                        position={new Vector3(400, 0, -500)}
                        label="📷 Gallery"
                        color="pink"
                        onClick={() => alert('Clicked Gallery')}
                    />
                    <hemisphereLight groundColor="red" />
                    <Geometries />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                    <Environment background preset="dawn" blur={0.8} />
                    <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1} />


                    {/* <Box position={[0, 0, 0]} /> */}

                    <OrbitControls />
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
                <div className='grid grid-cols-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='h-24 w-full'>
                            <img
                                src='https://picsum.photos/id/1011/800/400'
                                className="w-auto h-full object-cover rounded-xl"
                                onClick={() => setList(images_another)}
                            />
                        </div>
                        <div className='h-24 w-full'>
                            <img
                                src='https://picsum.photos/id/1011/800/400'
                                className="w-auto h-full object-cover rounded-xl"
                            />
                        </div>
                        <div className='h-24 w-full'>
                            <img
                                src='https://picsum.photos/id/1011/800/400'
                                className="w-auto h-full object-cover rounded-xl"
                            />
                        </div>
                        <div className='h-24 w-full'>
                            <img
                                src='https://picsum.photos/id/1011/800/400'
                                className="w-auto h-full object-cover rounded-xl"
                            />
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <CarouselWithEffect images={list} />
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isOpenMap} onClose={() => setIsOpenMap(false)}>
                <MapComponent />
            </Modal>
        </div>
    )
}
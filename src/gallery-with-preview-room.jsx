import CarouselWithEffect from './carousel'

import { useEffect, useRef, useState } from "react"
// import { Pannellum } from 'pannellum-react'
import ApartmentType from "./apartment-type"
import ApartmentDetailCard from './apartment-detail-card'
import { AdaptiveDpr, AdaptiveEvents, CameraControls, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import PanoramaWithTransition from './panorama-with-transition'

const list = ['/rooms/Phòng khách - bếp (4).png', '/rooms/Phòng khách - bếp (3).png', '/rooms/Phòng khách - bếp (5).png', '/rooms/Phòng ngủ 1 (2).png', '/rooms/Phòng ngủ Master (3).png']

export default function GalleryWithPreviewRoom() {
    const videoRef = useRef(null)
    const [isPremise, setIsPremise] = useState(true)
    const [isImage, setIsImage] = useState(false)
    const [isPano, setIsPano] = useState(false)
    const [isInfo, setIsInfo] = useState(false)
    const [isVideo, setIsVideo] = useState(false)
    const [currentImage, setCurrentImage] = useState('/assets/pano.jpg');

    const togglePlay = (isBool) => {
        setIsVideo(isBool)
    }


    const listSetState = [setIsPremise, setIsImage, setIsPano, setIsInfo, togglePlay]

    const onChangeState = (index) => {
        listSetState.map((item, i) => {
            if (i === index) {
                item(true)
            } else {
                item(false)
            }
        })
    }

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        if (isVideo) {
            video.play()
        } else {
            video.pause()
        }
    }, [isVideo])

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            <div className="flex md:flex-col justify-between gap-1 md:gap-2">
                <div className="h-22 w-full relative" onClick={() => onChangeState(0)}>
                    <img
                        src={'/rooms/1. Căn hộ loại A - 52m2 - 1PN_1WC.png'}
                        className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0">
                        <p className="text-xs md:text-sm px-2 py-2 font-bold bg-gray-50/20 backdrop-blur-md">MẶT BẰNG</p>
                    </div>
                </div>
                <div className="h-22 w-full relative" onClick={() => onChangeState(1)}>
                    <img
                        src={'/rooms/Phòng khách - bếp (2).png'}
                        className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0">
                        <p className="text-xs md:text-sm px-2 py-2 font-bold bg-gray-50/20 backdrop-blur-md">HÌNH ẢNH</p>
                    </div>
                </div>
                <div className="h-22 w-full relative" onClick={() => onChangeState(2)}>
                    <img
                        src={'/rooms/Phòng khách - bếp (2).png'}
                        className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0">
                        <p className="text-xs md:text-sm px-2 py-2 font-bold bg-gray-50/20 backdrop-blur-md">HÌNH ẢNH 360</p>
                    </div>
                </div>
                <div className="h-22 w-full relative" onClick={() => onChangeState(3)}>
                    <img
                        src={'/rooms/Phòng khách - bếp (2).png'}
                        className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0">
                        <p className="text-xs md:text-sm px-2 py-2 font-bold bg-gray-50/20 backdrop-blur-md">THÔNG TIN THÊM</p>
                    </div>
                </div>
                <div className="h-22 w-full relative" onClick={() => onChangeState(4)}>
                    <img
                        src={'/rooms/Phòng khách - bếp (2).png'}
                        className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0">
                        <p className="text-xs md:text-sm px-2 py-2 font-bold bg-gray-50/20 backdrop-blur-md">VIDEO GIỚI THIỆU</p>
                    </div>
                </div>
            </div>
            <div className="col-span-3">
                {isPremise ? <div className="relative">
                    <div className="md:absolute top-0 left-0 px-8 py-4">
                        <img
                            src="/rooms/Mặt bằng căn hộ loại C-Photoroom.png"
                            alt="Mặt bằng căn hộ"
                            className="img-3d-transparent h-[200px] md:h-[300px] w-auto mx-auto"
                        />
                    </div>
                    <div className="absolute bottom-0">
                        <ApartmentType />
                    </div>
                    <img
                        src='/rooms/1. Căn hộ loại A - 52m2 - 1PN_1WC.png'
                        alt={`Slide `}
                        className="w-full h-[250px] md:h-[500px] object-cover"
                    />
                </div> : null}
                {
                    isImage ? <CarouselWithEffect images={list} className={'h-[500px]'} /> : null
                }
                {isPano ? <Canvas>
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
                    <CameraControls minDistance={5} maxDistance={500} />
                    <OrbitControls />
                </Canvas> : null}
                {isInfo ? <ApartmentDetailCard /> : null}
                {isVideo ? <video
                    ref={videoRef}
                    src="/video.mp4"
                    className="h-[500px] w-auto object-cover"
                    controls
                    playsInline
                /> : null}
            </div>
        </div>
    )
}

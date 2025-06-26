import { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';
import gsap from 'gsap';
import { Html } from '@react-three/drei'; // để hiển thị UI trong canvas

export default function PanoramaWithTransition({ image }) {
    const currentMeshRef = useRef();
    const nextMeshRef = useRef();

    const [currentImage, setCurrentImage] = useState(image);
    const [nextImage, setNextImage] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // NEW

    const currentTexture = useLoader(TextureLoader, currentImage);
    const nextTexture = useLoader(TextureLoader, nextImage || image);

    useEffect(() => {
        if (image !== currentImage) {
            setNextImage(image);
            setIsTransitioning(true);
            setIsLoading(true); // bắt đầu loading
        }
    }, [image]);

    useEffect(() => {
        if (isTransitioning && nextTexture && nextMeshRef.current) {
            const img = nextTexture.image;

            if (img?.complete) {
                startTransition();
            } else {
                img.onload = () => startTransition();
            }
        }

        function startTransition() {
            gsap.fromTo(
                nextMeshRef.current.material,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    onComplete: () => {
                        setIsTransitioning(false);
                        setIsLoading(false); // ẩn loading
                        setCurrentImage(nextImage);
                        setNextImage(null);
                    },
                }
            );
        }
    }, [isTransitioning, nextTexture]);

    return (
        <>
            <mesh ref={currentMeshRef}>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial map={currentTexture} side={BackSide} />
            </mesh>

            <mesh ref={nextMeshRef} visible={isTransitioning}>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial
                    map={nextTexture}
                    side={BackSide}
                    transparent
                    opacity={0}
                />
            </mesh>

            {isLoading && (
                <Html center>
                    <div className="w-36 flex flex-col items-center justify-center space-y-2 bg-black/60 px-6 py-4 rounded-xl shadow-xl animate-fadeIn">
                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white font-medium text-sm">Đang tải ảnh...</p>
                    </div>
                </Html>
            )}
        </>
    );
}

import { Suspense } from 'react'
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei'

export function Video() {
    const size = useAspect(1800, 1000)
    return (
        <mesh scale={size} position={[0, 0, 0]}>
            <planeGeometry />
            <Suspense fallback={<FallbackMaterial url="10.jpg" />}>
                <VideoMaterial url="10.mp4" />
            </Suspense>
        </mesh>
    )
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}

function FallbackMaterial({ url }) {
    const texture = useTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}

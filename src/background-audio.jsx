import { useEffect } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function BackgroundAudio({ url }) {
    const { camera } = useThree()

    useEffect(() => {
        const handleClick = () => {
            const listener = new THREE.AudioListener()
            camera.add(listener)

            const sound = new THREE.Audio(listener)
            const audioLoader = new THREE.AudioLoader()
            audioLoader.load(url, (buffer) => {
                sound.setBuffer(buffer)
                sound.setLoop(true)
                sound.setVolume(0.5)
                sound.play()
            })
        }

        window.addEventListener('click', handleClick, { once: true })
        return () => window.removeEventListener('click', handleClick)
    }, [url])

    return null
}

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function BackgroundAudio({ url }) {
    const { camera } = useThree()
    const playedRef = useRef(false)

    useEffect(() => {
        const handleClick = () => {
            if (playedRef.current) return
            playedRef.current = true

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
    }, []) // 👈 chỉ chạy 1 lần duy nhất

    return null
}

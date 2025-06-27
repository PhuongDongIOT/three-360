import { useRef } from 'react'

export function soundButton({ url = '/click.wav' }) {
  const audioRef = useRef(null)

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url)
    //   audioRef.current.loop = true
      audioRef.current.volume = 1
    }

    audioRef.current.play()
  }

    return { playSound }
}

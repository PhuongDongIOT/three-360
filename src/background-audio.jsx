import { useEffect, useRef } from 'react'

export function BackgroundAudio({ src }) {
  const audioRef = useRef(null)
  const playedRef = useRef(false)

  useEffect(() => {
    const handleClick = () => {
      if (playedRef.current) return
      playedRef.current = true

      audioRef.current.play().catch((err) => {
        console.error('Audio play failed:', err)
      })
    }

    window.addEventListener('click', handleClick, { once: true })
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <audio ref={audioRef} src={src} loop hidden />
  )
}

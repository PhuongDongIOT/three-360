import { useEffect, useRef, useState } from 'react'

const playlist = [
    { title: 'Nhạc nền 1', url: '/music1.mp3' },
    { title: 'Nhạc nền 2', url: '/music2.mp3' },
    { title: 'Nhạc nền 3', url: '/music3.mp3' },
]

export default function AudioPlayerWithPlaylist() {
    const audioRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    const play = () => {
        audioRef.current?.play()
        setIsPlaying(true)
    }

    const pause = () => {
        audioRef.current?.pause()
        setIsPlaying(false)
    }

    const togglePlay = () => {
        isPlaying ? pause() : play()
    }

    const playSongAt = (index) => {
        setCurrentIndex(index)
        setTimeout(() => {
            audioRef.current?.play()
            setIsPlaying(true)
        }, 100)
    }

    const playNext = () => {
        const next = (currentIndex + 1) % playlist.length
        setCurrentIndex(next)
        setTimeout(() => audioRef.current?.play(), 100)
    }

    const playPrev = () => {
        const prev = (currentIndex - 1 + playlist.length) % playlist.length
        setCurrentIndex(prev)
        setTimeout(() => audioRef.current?.play(), 100)
    }

    // Auto play next when ended
    useEffect(() => {
        const audio = audioRef.current
        const handleEnded = () => playNext()
        audio?.addEventListener('ended', handleEnded)
        return () => audio?.removeEventListener('ended', handleEnded)
    }, [currentIndex])

    useEffect(() => {
        const handleFirstClick = () => {
            if (!isPlaying) {
                audioRef.current?.play().then(() => {
                    setIsPlaying(true)
                }).catch(err => {
                    console.error('Auto-play failed:', err)
                })
            }
        }

        window.addEventListener('click', handleFirstClick, { once: true })

        return () => {
            window.removeEventListener('click', handleFirstClick)
        }
    }, [isPlaying])


    return (
        <div className="fixed top-4 md:top-auto md:bottom-4 right-4 w-[260px]  shadow-xl rounded-xl shadown-inner bg-cyan-50/20 p-4 z-50">
            <div className="flex justify-between items-center">
                <div className="text-white font-medium text-sm truncate max-w-[180px]">
                    🎵 {playlist[currentIndex].title}
                </div>
                <button
                    className="text-gray-500 text-xs"
                    onClick={() => setIsExpanded((prev) => !prev)}
                >
                    {isExpanded ? '🔽' : '🔼'}
                </button>
            </div>

            <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'mt-3 max-h-40' : 'max-h-0'}`}>
                <div className="flex items-center gap-2">
                    <button onClick={togglePlay} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full shadow">
                        {isPlaying ? '⏸ Tạm dừng' : '▶ Phát'}
                    </button>
                    <button onClick={playNext} className="px-3 py-1 bg-gray-200 text-sm rounded-full shadow">
                        ⏭ Tiếp
                    </button>
                </div>
            </div>

            <audio ref={audioRef} src={playlist[currentIndex].url} loop={false} />
        </div>
    )

}

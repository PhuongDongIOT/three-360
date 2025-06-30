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
  const [isExpanded, setIsExpanded] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

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

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => playNext()
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [currentIndex])

  useEffect(() => {
    const handleClick = () => {
      if (!isPlaying) {
        play()
      }
    }
    window.addEventListener('click', handleClick, { once: true })
    return () => window.removeEventListener('click', handleClick)
  }, [isPlaying])

    const formatTime = (sec) => {
    if (!sec) return '00:00'
    const minutes = Math.floor(sec / 60).toString().padStart(2, '0')
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

    return (
        <div className='fixed top-2 md:top-auto md:bottom-4 right-2 w-[300px] shadow-xl rounded-xl shadown-inner bg-white/10 backdrop-blur-md  z-50'>
            <div className="relative z-10 rounded-xl shadow-xl">
                <button
                    className="absolute top-0 right-0 text-gray-500 text-xs"
                    onClick={() => setIsExpanded((prev) => !prev)}
                >
                    {isExpanded ? '🔽' : '🔼'}
                </button>
                <div className="transition-all duration-500 rounded-t-xl p-2 lg:px-4 lg:pt-4 space-y-2 sm:space-y-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src="/2.jpg"
                            loading="lazy"
                            decoding="async"
                            alt=""
                            className="flex-none rounded-lg bg-slate-100"
                            width={64}
                            height={64}
                        />
                        <div className="min-w-0 flex-auto space-y-1 font-semibold">
                            <p className="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6">
                                <abbr title="Episode">Ep.</abbr> 128
                            </p>
                            <h2 className="text-white transition-all duration-500 text-sm leading-6 truncate">
                                🎵 {playlist[currentIndex].title}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className={`transition-all duration-100  ${isExpanded ? 'mt-3 max-h-auto' : 'max-h-0 opacity-0'}`}>

                    <div className="space-y-2 w-full px-2 *:lg:px-4">
                        <div className="relative">
                            <div className="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 h-2"
                                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                                    role="progressbar"
                                    aria-label="music progress"
                                    aria-valuenow={1456}
                                    aria-valuemin={0}
                                    aria-valuemax={4550}
                                />
                            </div>
                            <div className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"  style={{ left: `${(currentTime / duration) * 100 + 4 || 0}%` }}>
                                <div className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                            <div className="text-cyan-500 transition-all duration-500 dark:text-slate-100">
                                {formatTime(currentTime)}
                            </div>
                            <div className="text-white transition-all duration-500">
                                {formatTime(duration)}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center  border-t border-white'>

                        <div className="flex-auto flex items-center justify-evenly">
                            <button type="button" aria-label="Add to favorites">
                                <svg width={24} height={24}>
                                    <path
                                        d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="hidden sm:block lg:hidden xl:block"
                                aria-label="Previous"
                                onClick={playPrev}
                            >
                                <svg width={24} height={24} fill="none">
                                    <path
                                        d="m10 12 8-6v12l-8-6Z"
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6 6v12"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button type="button" aria-label="Rewind 10 seconds">
                                <svg width={24} height={24} fill="none">
                                    <path
                                        d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M5 5v3.111c0 .491.398.889.889.889H9"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <button
                            type="button"
                            className=" transition-all duration-500 dark:text-slate-700 flex-none -my-2 mx-auto w-12 h-12 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                            aria-label="Pause"
                            onClick={togglePlay}
                        >
                            <svg width={30} height={32} fill="#fff">
                                <rect x={6} y={4} width={4} height={24} rx={2} />
                                <rect x={20} y={4} width={4} height={24} rx={2} />
                            </svg>
                        </button>
                        <div className="flex-auto flex items-center justify-evenly">
                            <button type="button" aria-label="Skip 10 seconds" className="">
                                <svg width={24} height={24} fill="none">
                                    <path
                                        d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="hidden sm:block lg:hidden xl:block"
                                aria-label="Next"
                                onClick={playNext}
                            >
                                <svg width={24} height={24} fill="none">
                                    <path
                                        d="M14 12 6 6v12l8-6Z"
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18 6v12"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset inset text-white transition-all duration-500 dark:bg-slate-500"
                            >
                                1x
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src={playlist[currentIndex].url} loop={false} />
        </div>

    )

}

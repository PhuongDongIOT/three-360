import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './embla-cus.css'

export default function HorizontalEmblaCarousel({ slides = [] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true })
    const [prevEnabled, setPrevEnabled] = useState(false)
    const [nextEnabled, setNextEnabled] = useState(false)

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setPrevEnabled(emblaApi.canScrollPrev())
        setNextEnabled(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <div className="embla relative">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((slide, index) => (
                        <div className="embla__slide h-[500px] relative" key={index}>
                            <img
                                src={slide}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-cover rounded-xl"
                            />
                            <div className='absolute bottom-0 right-0'>
                                <div className="relative z-10 rounded-xl shadow-xl">
                                    <button className="absolute top-0 right-0 text-gray-500 text-xs">🔽</button>
                                    <div className="transition-all duration-500 rounded-t-xl p-2 lg:px-4 lg:pt-4 space-y-2 sm:space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                loading="lazy"
                                                decoding="async"
                                                alt=""
                                                className="flex-none rounded-lg bg-slate-100"
                                                width={64}
                                                height={64}
                                                src="/2.jpg"
                                            />
                                            <div className="min-w-0 flex-auto space-y-1 font-semibold">
                                                <p className="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6">
                                                    <abbr title="Episode">Ep.</abbr> 128
                                                </p>
                                                <h2 className="text-white transition-all duration-500 text-sm leading-6 truncate">
                                                    🎵 Nhạc nền 3
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="transition-all duration-100  mt-3 max-h-auto">
                                        <div className="space-y-2 w-full px-2 *:lg:px-4">
                                            <div className="relative">
                                                <div className="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 h-2"
                                                        role="progressbar"
                                                        aria-label="music progress"
                                                        aria-valuenow={1456}
                                                        aria-valuemin={0}
                                                        aria-valuemax={4550}
                                                        style={{ width: "23.1292%" }}
                                                    />
                                                </div>
                                                <div
                                                    className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
                                                    style={{ left: "27.1292%" }}
                                                >
                                                    <div className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5" />
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                                                <div className="text-cyan-500 transition-all duration-500 dark:text-slate-100">
                                                    01:30
                                                </div>
                                                <div className="text-white transition-all duration-500">06:32</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center  border-t border-white">
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

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nút trái */}
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={scrollPrev}
                disabled={!prevEnabled}
            >
                <ChevronLeft size={24} />
            </button>

            {/* Nút phải */}
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={scrollNext}
                disabled={!nextEnabled}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    )
}

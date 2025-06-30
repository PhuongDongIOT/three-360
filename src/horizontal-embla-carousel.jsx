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
                            <div className='absolute bottom-0 right-0 max-w-[232px] rounded-xl shadown-inner bg-white/10 backdrop-blur-md'>
                                <div className="relative z-10 rounded-xl shadow-xl">
                                    <div className="transition-all duration-500 rounded-t-xl p-2 lg:px-4 lg:pt-4 space-y-2 sm:space-y-4">
                                        <div className="flex flex-col    space-x-4">
                                            <img
                                                loading="lazy"
                                                decoding="async"
                                                alt=""
                                                className="flex-none rounded-lg bg-slate-100 object-cover w-full"
                                                src="/2.jpg"
                                            />
                                            <div className="min-w-0 flex-auto space-y-1 font-semibold">
                                                <h2 className="text-white transition-all duration-500 text-sm leading-6 truncate">
                                                    🎵 Nhạc 
                                                </h2>
                                                 <p className="text-white transition-all duration-500 text-xs line-clamp-4">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui incidunt quod consequuntur reprehenderit, nisi odio, dolorem quisquam possimus vero molestias repellendus, mollitia nihil corrupti commodi numquam deserunt vitae? Veritatis, tempora! 
                                                </p>
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

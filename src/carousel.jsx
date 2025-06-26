import React, { useCallback, useRef, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'

function CarouselWithEffect(props) {
    const { images } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const containerRef = useRef(null)

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            )
        }
    }, [])

    return (
        <div className="w-full flex flex-col items-center space-y-6">
            <div ref={containerRef} className="relative max-w-4xl w-full overflow-hidden">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        {images.map((src, index) => (
                            <div className="embla__slide" key={index}>
                                <img
                                    src={src}
                                    alt={`Slide ${index}`}
                                    className="w-full h-[400px] object-cover rounded-xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={scrollPrev}
                    className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}

export default CarouselWithEffect

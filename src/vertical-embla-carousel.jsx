import useEmblaCarousel from 'embla-carousel-react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useCallback } from 'react'

export default function VerticalEmblaCarousel({ slides = [], height = 400 }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: true })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="relative w-full" style={{ height }}>
            {/* Buttons */}
            <button
                onClick={scrollPrev}
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white/70 hover:bg-white text-black p-1 rounded-full shadow"
            >
                <ChevronUp size={20} />
            </button>
            <button
                onClick={scrollNext}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-white/70 hover:bg-white text-black p-1 rounded-full shadow"
            >
                <ChevronDown size={20} />
            </button>

            {/* Carousel */}
            <div className="overflow-hidden w-full h-full rounded-xl" ref={emblaRef}>
                <div className="flex flex-col h-full">
                    {slides.map((src, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_100%] w-full flex items-center justify-center"
                        >
                            <img
                                src={src}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-cover rounded-xl shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

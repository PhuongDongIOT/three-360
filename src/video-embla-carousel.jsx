import { useEffect, useState, useRef, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './embla-cus.css'

const slides = ['', '', '', ''] // Đổi thành nội dung video nếu cần

export default function VideoEmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true })
  const [prevEnabled, setPrevEnabled] = useState(false)
  const [nextEnabled, setNextEnabled] = useState(false)

  const videoRefs = useRef([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevEnabled(emblaApi.canScrollPrev())
    setNextEnabled(emblaApi.canScrollNext())

    const selectedIndex = emblaApi.selectedScrollSnap()

    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === selectedIndex) {
        video.play().catch(() => {}) // Tránh lỗi nếu chưa tương tác
      } else {
        video.pause()
      }
    })
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
          {slides.map((_, index) => (
            <div className="embla__slide h-[500px] relative" key={index}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover rounded-xl"
                src="/video.mp4"
                muted
                loop
                playsInline
              />
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

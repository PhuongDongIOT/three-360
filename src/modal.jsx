import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null)
    const overlayRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            )
            gsap.fromTo(
                modalRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
            )
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999999] bg-black/50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className="rounded-xl w-full md:max-w-4xl lg:max-w-6xl shadow-lg px-4 lg:px-0 py-4 lg:py-0 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react'; // hoặc dùng icon khác tùy ý

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            gsap.fromTo(
                modalRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999999] bg-black/50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className="relative rounded-xl w-full md:max-w-4xl lg:max-w-6xl shadow-lg px-4 lg:px-0 py-4 lg:py-0 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 md:top-0 md:right-0  z-10 p-1 rounded-full transition duration-300 group"
                >
                    <X className="w-10 h-10 text-white transform transition-transform duration-300 group-hover:rotate-90" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

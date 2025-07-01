import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function VerticalTextScroll({ text = "THẮP SÁNG TƯƠNG LAI, AN CƯ LẬP NGHIỆP " }) {
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" }
        });
        
        const textWidth = textRef.current.offsetWidth;
        const containerWidth = containerRef.current.offsetWidth

        tl.to(textRef.current, {
            x: -textWidth,
            duration: textWidth / 100,
        });

        const marqueeElements = textRef.current.children;

        if (marqueeElements.length < 2) {
            textRef.current.innerHTML += textRef.current.innerHTML;
        }

        const singleTextWidth = marqueeElements[0].offsetWidth;

        const advanceTl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

        advanceTl.to(textRef.current, {
            x: -singleTextWidth,
            duration: singleTextWidth / 50,
        });

        
        return () => {
            advanceTl.kill();
        };

    }, [text]); 


    return (
        <div
            className="w-full overflow-hidden whitespace-nowrap text-3xl font-bold text-gray-50/80 py-2 md:text-4xl lg:text-6xl"
            ref={containerRef}
        >
            <div className="inline-block" ref={textRef}>
                <span className="inline-block pr-12">{text}</span>
                <span className="inline-block pr-12">{text}</span>
            </div>
        </div>
    );
}

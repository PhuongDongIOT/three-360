import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import InfoCard from './info-card'

const tabs = ['Home', 'About', 'Contact']
const content = {
    Home: <InfoCard />,
    About: <InfoCard />,
    Contact: <InfoCard />,
}

export default function TabWithGsap() {
    const [activeTab, setActiveTab] = useState('Home')
    const contentRef = useRef(null)

    const handleTabChange = (tab) => {
        if (tab === activeTab) return

        // Animate out
        gsap.to(contentRef.current, {
            opacity: 0,
            x: -50,
            duration: 0.3,
            onComplete: () => {
                setActiveTab(tab)
                // Animate in
                gsap.fromTo(
                    contentRef.current,
                    { opacity: 0, x: 50 },
                    { opacity: 1, x: 0, duration: 0.3 }
                )
            },
        })
    }

    useEffect(() => {
        gsap.set(contentRef.current, { opacity: 1, x: 0 })
    }, [])

    return (
        <div className="w-full mx-auto text-center text-white">
            {/* Tabs */}
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-4 py-2 rounded ring-0 ${activeTab === tab ? 'bg-blue-400/20 text-white' : 'bg-gray-200/10'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Animated Content */}
            <div
                ref={contentRef}
                className="p-4 rounded-lg text-md min-h-[100px] text-left"
            >
                {content[activeTab]}
            </div>
        </div>
    )
}

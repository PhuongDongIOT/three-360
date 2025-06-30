import React from 'react'
import { Home, Info, Camera, ArrowRight } from 'lucide-react'

const iconMap = {
    home: Home,
    info: Info,
    camera: Camera,
    arrow: ArrowRight,
}

export default function IconButtonCol({ buttons = [] }) {
    return (
        <div className='flex flex-col gap-4'>
            {buttons.map((btn, index) => {
                const Icon = iconMap[btn.icon] || Home
                return (
                    <button
                        key={index}
                        onClick={btn.onClick}
                        className="sm:border-cyan-50/20 button w-14 h-12 sm:w-16 sm:h-14 md:w-18 md:h-16 shadow-inner bg-cyan-400/20 rounded-lg cursor-pointer select-none
                      active:translate-y-2  sm:active:[box-shadow:0_0px_0_0_rgba(0,255,255,0.3),0_0px_0_0_rgba(0,255,255,0.2)]
                      active:border-b-[0px]
                      transition-all duration-150 sm:[box-shadow:0_10px_0_0_rgba(0,255,255,0.3),0_15px_0_0_rgba(0,255,255,0.2)]
                      sm:border-b-[1px] text-center"
                    >
                        <div className='w-full mx-auto flex justify-center'>
                            <Icon className="font-bold w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-white text-2xs lg:text-xs">{btn.label}</span>
                    </button>
                )
            })}
        </div>
    )
}

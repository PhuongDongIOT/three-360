import React from 'react'
import { Home, Info, Camera, ArrowRight } from 'lucide-react'

const iconMap = {
  home: Home,
  info: Info,
  camera: Camera,
  arrow: ArrowRight,
}

export default function IconButtonGrid({ buttons = [] }) {
  return (
    <div className="grid grid-cols-5 gap-1 lg:gap-4 p-1 lg:p-4">
      {buttons.map((btn, index) => {
        const Icon = iconMap[btn.icon] || Home
        return (
          <button
            key={index}
            onClick={btn.onClick}
            className="border border-dotted border-cyan-300 flex flex-col w-full gap-2 items-center justify-center p-2 lg:p-4 bg-blue-600/40 shadow-inner rounded hover:bg-blue-600/80 transition"
          >
            <Icon className="w-6 h-6 text-white" />
            <span className="font-medium text-white text-xs lg:text-sm">{btn.label}</span>
          </button>
        )
      })}
    </div>
  )
}

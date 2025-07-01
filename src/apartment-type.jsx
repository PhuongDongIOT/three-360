import { useState } from 'react'

export default function ApartmentType() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white shadow-md overflow-hidden max-w-sm mx-auto font-sans transition-all">
      {/* Header Section */}
      <div
        className="bg-blue-800 text-white py-2 px-6 text-center text-md font-bold cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
       {isOpen ? '' : 'CHI TIẾT'} CĂN HỘ LOẠI A {isOpen ? '🔼' : '🔽'}
      </div>

      {/* Collapse Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Configuration Section */}
        <div className="py-2 px-4 border-b border-gray-200">
          <p className="text-sm font-extrabold text-blue-900 text-center">
            01 PN / 01 WC
          </p>
        </div>

        {/* Area Details */}
        <div className="py-2 px-4 border-b border-gray-200 text-gray-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold">DIỆN TÍCH TIM TƯỜNG:</span>
            <span className="text-xs font-bold text-blue-700">51.90 m²</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold">DIỆN TÍCH THÔNG THỦY:</span>
            <span className="text-xs font-bold text-blue-700">47.60 m²</span>
          </div>
        </div>

        {/* Room Sizes Details */}
        <div className="py-2 px-4 text-gray-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs">PHÒNG KHÁCH + BẾP:</span>
            <span className="text-xs font-bold">30.00 m²</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs">PHÒNG NGỦ:</span>
            <span className="text-xs font-bold">10.90 m²</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs">WC:</span>
            <span className="text-xs font-bold">02.90 m²</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">LÔ GIA:</span>
            <span className="text-xs font-bold">02.60 m²</span>
          </div>
        </div>
      </div>
    </div>
  )
}

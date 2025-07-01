import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

export default function ApartmentDetailCard() {
  return (
    <div className="w-full mx-auto h-[500px] rounded-lg shadow-lg font-sans overflow-hidden transition-all duration-500">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-blue-400/40 text-white px-4 py-3 font-bold flex justify-between items-center"
      >
        <span>CĂN HỘ LOẠI A - 2PN / 2WC</span>
        <span>🔼</span>
      </div>
      
      <div className={`transition-all duration-500 ease-in-out overflow-hidden opacity-100`}
      >
        <div className="p-4 border-b text-sm text-white space-y-2">
          <div className="flex justify-between">
            <span>Diện tích tim tường:</span>
            <span className="font-semibold text-white">68.50 m²</span>
          </div>
          <div className="flex justify-between">
            <span>Diện tích thông thủy:</span>
            <span className="font-semibold text-white">63.00 m²</span>
          </div>
        </div>

        <div className="p-4 border-b text-sm text-white space-y-1">
          {[
            ['Phòng khách + Bếp', '28.00 m²'],
            ['Phòng ngủ 1', '12.00 m²'],
            ['Phòng ngủ 2', '10.00 m²'],
            ['WC 1', '3.00 m²'],
            ['WC 2', '2.50 m²'],
            ['Lô gia', '2.00 m²'],
          ].map(([label, value]) => (
            <div className="flex justify-between" key={label}>
              <span>{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-b text-sm text-white space-y-1">
          <p className="font-semibold text-white">Tính năng nổi bật:</p>
          <ul className="list-disc list-inside">
            <li>View công viên, thoáng mát</li>
            <li>Căn góc, nhiều ánh sáng tự nhiên</li>
            <li>Full nội thất cao cấp</li>
          </ul>
        </div>

        <div className="p-4 flex justify-between items-center">
          <button className="px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
            Yêu thích ❤️
          </button>
        </div>
      </div>
    </div>
  )
}

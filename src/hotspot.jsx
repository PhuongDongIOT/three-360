import React from 'react';
import { Vector3 } from 'three';
import { Html } from '@react-three/drei';

export function Hotspot({ position, label = '🔥 Info', onClick, color = 'red' }) {
  const colorMap = {
    red: 'text-red-600 border-red-400',
    blue: 'text-blue-600 border-blue-400',
    green: 'text-green-600 border-green-400',
    yellow: 'text-yellow-600 border-yellow-400',
    pink: 'text-pink-600 border-pink-400',
  };

  const classes = colorMap[color] || colorMap.red;

  return (
    <>
      {/* Sphere nhỏ làm marker 3D */}
      <mesh position={position}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshStandardMaterial color="cyan" />
      </mesh>

      {/* HTML button floating */}
      <Html position={position} center distanceFactor={600}>
        <button
          className={`relative px-4 py-2 bg-white border rounded-md cursor-pointer shadow-md font-semibold transition glow-button ${classes}`}
          onClick={onClick}
        >
          {label}
        </button>
      </Html>
    </>
  );
}

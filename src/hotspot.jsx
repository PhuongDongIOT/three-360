import React from 'react';
import { Vector3 } from 'three';
import { Html } from '@react-three/drei';

export function Hotspot({ handleClick, position, label = '🔥 Info', onClick, color = 'red' }) {
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
      <mesh position={position}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshStandardMaterial color="cyan" />
      </mesh>

      <Html position={position} center distanceFactor={600}  onClick={handleClick}>
        <button
          className={`relative z-0 px-4 py-2 cursor-pointer font-semibold ${classes}`}
          onClick={onClick}
        >
          <span className='glow-animated transition'>{label}</span>
        </button>
      </Html>
    </>
  );
}

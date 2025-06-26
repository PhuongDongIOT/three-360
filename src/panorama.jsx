import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';

export default function Panorama({ image }) {
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, image);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
}
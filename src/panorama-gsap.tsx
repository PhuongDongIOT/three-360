import { useLoader, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

type Props = {
  currentImage: string;
  nextImage: string;
  trigger: boolean;
};

export default function PanoramaGSAP({ currentImage, nextImage, trigger }: Props) {
  const texture1 = useLoader(THREE.TextureLoader, currentImage);
  const texture2 = useLoader(THREE.TextureLoader, nextImage);

  const meshRef1 = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);

  // Khởi tạo opacity ban đầu
  useEffect(() => {
    if (meshRef1.current && meshRef2.current) {
      meshRef1.current.material.opacity = 1;
      meshRef2.current.material.opacity = 0;
    }
  }, []);

  // Khi trigger = true → animate crossfade
  useEffect(() => {
    if (trigger) {
      gsap.to(meshRef2.current.material, {
        opacity: 1,
        duration: 1,
        onStart: () => {
          // đảm bảo ảnh mới hiển thị bên trên
          meshRef2.current.visible = true;
        },
      });

      gsap.to(meshRef1.current.material, {
        opacity: 0,
        duration: 1,
      });
    }
  }, [trigger]);

  return (
    <>
      <mesh ref={meshRef1}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial
          map={texture1}
          side={THREE.BackSide}
          transparent
          opacity={1}
        />
      </mesh>

      <mesh ref={meshRef2}>
        <sphereGeometry args={[499.5, 60, 40]} />
        <meshBasicMaterial
          map={texture2}
          side={THREE.BackSide}
          transparent
          opacity={0}
        />
      </mesh>
    </>
  );
}

import * as THREE from 'three'
import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Html, OrbitControls } from '@react-three/drei'
import { MathUtils } from 'three'

const material = new THREE.MeshStandardMaterial()
const geometries = [
  //   { geometry: new THREE.TetrahedronBufferGeometry(2) },
  //   { geometry: new THREE.CylinderBufferGeometry(0.8, 0.8, 2, 32) },
  { geometry: new THREE.ConeGeometry(1.1, 1.7, 32) },
  //   { geometry: new THREE.SphereBufferGeometry(1.5, 32, 32) },
  //   { geometry: new THREE.IcosahedronBufferGeometry(2) },
  //   { geometry: new THREE.TorusBufferGeometry(1.1, 0.35, 16, 32) },
  { geometry: new THREE.OctahedronGeometry(2) },
  //   { geometry: new THREE.SphereBufferGeometry(1.5, 32, 32) },
  //   { geometry: new THREE.BoxBufferGeometry(2.5, 2.5, 2.5) }
]

export function Geometries() {
  const n = 20;
  const randProps = useMemo(() => Array.from({ length: n }, () => geometries[Math.floor(Math.random() * geometries.length)]), [])
  return randProps.map((prop, index) => {
    const color = new THREE.Color(`hsl(${Math.random() * 360}, 80%, 60%)`)
    const mat = new THREE.MeshStandardMaterial({ color })

    return (
      <Float key={index}>
        <mesh
          scale={MathUtils.randFloat(2, 8)}
          position={[
            MathUtils.randFloat(-500, 500),
            MathUtils.randFloat(-500, 500),
            MathUtils.randFloat(-500, 500),
          ]}
          geometry={prop.geometry}
          material={mat}
        />
      </Float>
    )
  })

}
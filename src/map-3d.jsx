import { Html } from '@react-three/drei'

export function Map3D({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <planeGeometry args={[10, 7]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        occlude
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.62165382228!2d106.7116703!3d10.79940645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1750914043166!5m2!1sen!2s"
          width="1200"
          height="800"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Html>
    </group>
  )
}

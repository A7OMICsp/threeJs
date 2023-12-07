import { useGLTF } from '@react-three/drei';

import birdScene from '../assets/3d/bird.glb'

const Bird = () => {
  const {scene, animations } = useGLTF(birdScene);
  return (
    <mesh position={[-2, 0.6, -2]} scale={[0.002, 0.002, 0.002]}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Bird
import { useGLTF } from '@react-three/drei';

import skyScene from '../assets/3d/sky.glb'
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Sky = ({isRotating, ...props}) => {
    const sky = useGLTF(skyScene);
    const skyRef = useRef();
    
    useFrame(() => {
        if(isRotating) {
            skyRef.current.rotation.y += 0.001;
        }
    });

    return (
        <mesh ref={skyRef}>
            <primitive object={sky.scene} />
        </mesh>
    )
}

export default Sky
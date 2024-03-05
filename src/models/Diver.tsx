import { useAnimations, useGLTF } from '@react-three/drei'
import diverScene from '../assets/3d/diver.glb'
import { useEffect, useRef } from 'react';



const Diver = () => {
    const ref = useRef();
    const { scene, animations } = useGLTF(diverScene);
    const { actions } = useAnimations(animations, ref);

    useEffect(() => {
        actions['Take 001']?.play();
    }, [actions])

    return (
        <mesh ref={ref}>
            <primitive object={scene} />
        </mesh>
    )
}

export default Diver
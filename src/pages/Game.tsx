import { Canvas, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Mesh } from 'three'


const Box = (props: any) => {
    const meshRef = useRef<Mesh>(null!);


    useEffect(() => {
        document.addEventListener('ArrowRight', () => {
            console.log("Arrow Right");
            meshRef.current.position.x += 5;
        });

        return () => {
            document.removeEventListener('ArrowRight', () => {
                console.log("Arrow Right");
                meshRef.current.position.x += 5;
            });
        }

    }, [])

    useFrame((state, delta) => {
        meshRef.current!.rotation.x += delta;
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={1.5}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    )

}

const Game = () => {

    return (
        <section className="w-full h-screen">
            <Canvas
                className="w-full h-screen"
                camera={{ near: 0.1, far: 1000 }}
            >
                <directionalLight intensity={0.5} />
                <Box></Box>

            </Canvas>
        </section>
    )
}

export default Game
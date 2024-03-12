import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import Loader from "../components/Loader"
import Island from "../models/Island"
import Sky from "../models/Sky"
import Bird from "../models/Bird"
import Plane from "../models/Plane"
import Diver from "../models/Diver"

{/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
  POPUP
</div> */}

const Home = () => {

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale!: number[];
    const screenPosition: number[] = [0, -1, -2];
    const rotation: number[] = [0.1, -1, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation]
  }
  
  const adjustPlaneForScreenSize = () => {
    let screenScale: number[];
    let screenPosition: number[];
    const rotation: number[] = [0, 20.4, -0.4];

    if (window.innerWidth < 768) {
      screenScale = [1.2, 1.2, 1.2];
      screenPosition = [0, -.7, 1.9]
    } else {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1, 1.8]
    }

    return [screenScale, screenPosition, rotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition, planeRotation] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 10]} intensity={1} />
          <ambientLight intensity={0.5} />
          <hemisphereLight color="#b1e1ff" groundColor="#000" intensity={1}/>

          <Bird />
          {/* <Diver /> */}
          <Plane
            position={planePosition}
            scale={planeScale}
            rotation={planeRotation}
            isRotating={isRotating}
          />
          <Sky 
            isRotating={isRotating}
          />
          <Island 
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home
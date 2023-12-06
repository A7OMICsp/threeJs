import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Model3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    if (!currentRef) return;

    const { clientWidth: width, clientHeight: height } = currentRef;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);

    scene.add(camera);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const groundGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
    const material = new THREE.MeshPhongMaterial({ color: 0xffc927 });

    const ground = new THREE.Mesh(groundGeometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.position.z = 0;
    //scene.add(ground);

    scene.add(new THREE.AxesHelper(5));

    const cube = new THREE.Mesh(boxGeometry, material);
    cube.position.z = -5;
    cube.position.y = -1;

    //scene.add(cube);
    camera.lookAt(new THREE.Vector3(0, 0, 0));   
    scene.fog = new THREE.FogExp2(0x000000, 0.1); 

    const ambientLight = new THREE.AmbientLight(0x404040, 15); // soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf6308e, 15);
    pointLight.position.set(0, 0, 1);
    scene.add(pointLight);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      cube.rotation.x = elapsedTime;
      cube.rotation.y = elapsedTime;
      cube.position.y = Math.sin(elapsedTime);

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const resize = () => {
      const updatedWidth = currentRef.clientWidth;
      const updatedHeight = currentRef.clientHeight;

      renderer.setSize(updatedWidth, updatedHeight);
      camera.aspect = updatedWidth / updatedHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);

    animate();

    renderer.render(scene, camera);

    return () => {
      currentRef.removeChild(renderer.domElement);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Model3D;

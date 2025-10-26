import { useRef, useEffect, useState, useLayoutEffect } from "react";
import "./LandingExperience.css";
import {
    Clock,
    Group,
    MeshToonMaterial,
    NearestFilter,
    TextureLoader,
    type BufferGeometry,
    type Material,
    type Mesh,
} from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";

type SectionMesh = Mesh<BufferGeometry, Material>;

interface ExperienceSceneProps {
    isMobile: boolean;
}

/**
 * This is the inner scene — all R3F hooks go here.
 */
const ExperienceScene = ({ isMobile }: ExperienceSceneProps) => {
    const cameraGroup = useRef<Group>(null!);
    const parameters = { materialColor: "#ffaa00" };

    // Load gradient texture
    const texture = new TextureLoader().load("/models/textures/gradients/3.jpg");
    texture.magFilter = NearestFilter;

    // Create material
    const material = new MeshToonMaterial({
        color: parameters.materialColor,
        gradientMap: texture,
    });

    // Mesh Refs
    const meshTorus = useRef<SectionMesh>(null!);
    const meshCone = useRef<SectionMesh>(null!);
    const sectionMeshes = isMobile ? [meshTorus] : [meshTorus, meshCone];

    // Set initial scale to 0 immediately (before paint)
    useLayoutEffect(() => {
        if (meshTorus.current) {
            meshTorus.current.scale.set(0, 0, 0);
        }
    }, []);

    // GSAP Animation for torus scale (initial load)
    useEffect(() => {
        if (meshTorus.current) {
            // Animate to scale 1
            gsap.to(meshTorus.current.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.2,
                ease: "back.out(1.7)",
                delay: 0.3,
            });
        }
    }, []);

    // GSAP Animation for position change on resize
    useEffect(() => {
        if (meshTorus.current) {
            const newPosition = isMobile ? [0.1, 0, 0] : [2, 0, -1];

            gsap.to(meshTorus.current.position, {
                x: newPosition[0],
                y: newPosition[1],
                z: newPosition[2],
                duration: 0.8,
                ease: "power2.out",
            });
        }
    }, [isMobile]);

    /**
     * Animation loop (useFrame)
     */
    const clock = new Clock();
    let previousTime = 0;

    useFrame(() => {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;

        // Rotate meshes
        sectionMeshes.forEach((ref) => {
            if (!ref.current) return;
            ref.current.rotation.x += deltaTime * 0.1;
            ref.current.rotation.y += deltaTime * 0.12;
        });
    });

    return (
        <>
            <group ref={cameraGroup} />
            <directionalLight color="#ffffff" intensity={3} position={[2, 1, 0]} />

            {/* Torus — always shown */}
            <mesh ref={meshTorus} material={material}>
                <torusGeometry args={[1, 0.4, 60]} />
            </mesh>

            <OrbitControls enableZoom={false} />
        </>
    );
};

/**
 * Outer wrapper: This is where Canvas lives.
 */
const LandingExperience = () => {
    const [isMobile, setIsMobile] = useState(false);
    const IS_MOBILE_VALUE = 768;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= IS_MOBILE_VALUE);
        checkMobile();

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="landing--wrapper">
            <Canvas
                camera={{ fov: 35, position: [0, 0, 6], near: 0.1, far: 100 }}
                className="canvas"
                gl={{ alpha: true }}>
                <ExperienceScene isMobile={isMobile} />
            </Canvas>
        </div>
    );
};

export default LandingExperience;

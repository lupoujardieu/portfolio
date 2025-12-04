import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import { AnimationAction, AnimationClip, AnimationMixer, Group, LoopRepeat } from "three";

const LucasModel = () => {
    const group = useRef<Group>(null!);
    const fbx = useFBX("/models/lucas/lucas.fbx");

    // Animation mixer setup
    const { mixer, clip } = useMemo(() => {
        const mixer = new AnimationMixer(fbx);
        // Try to pick the first available animation clip if any
        const clip = (fbx as any).animations?.[0] as AnimationClip | undefined;
        return { mixer, clip };
    }, [fbx]);

    const actionRef = useRef<AnimationAction | null>(null);

    useEffect(() => {
        if (clip) {
            const action = mixer.clipAction(clip);
            action.setLoop(LoopRepeat, Infinity);
            action.play();
            actionRef.current = action;
        }

        return () => {
            actionRef.current?.stop();
        };
    }, [clip, mixer]);

    // Drive the mixer
    useFrame((_, delta) => {
        mixer.update(delta);
    });

    // Basic positioning/scaling to fit nicely in small card
    return (
        <group ref={group} position={[0, -1.1, 0]}>
            <primitive object={fbx} scale={0.013} />
        </group>
    );
};

const AboutExperience = () => {
    return (
        <div className="about-experience--wrapper">
            <Canvas
                camera={{ fov: 35, position: [0, 1, 6], near: 0.1, far: 100 }}
                className="canvas"
                gl={{ alpha: true }}>
                <ambientLight intensity={2} />
                <directionalLight intensity={1.2} position={[2, 3, 2]} />
                <directionalLight intensity={0.5} position={[-2, 2, -2]} />

                <LucasModel />
            </Canvas>
        </div>
    );
};

export default AboutExperience;

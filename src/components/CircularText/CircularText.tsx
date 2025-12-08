import React, { useRef, type MouseEventHandler } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./CircularText.css";

interface CircularTextProps {
    text: string;
    spinDuration?: number;
    onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
    onClick?: MouseEventHandler;
    icon?: React.ReactNode;
}

const CircularText: React.FC<CircularTextProps> = ({ text, spinDuration = 20, onHover = "speedUp", icon, onClick }) => {
    const letters = Array.from(text);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const isHovering = useRef(false);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Initial rotation animation
        animationRef.current = gsap.to(containerRef.current, {
            rotation: "+=360",
            duration: spinDuration,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
        });

        return () => {
            animationRef.current?.kill();
        };
    }, [spinDuration, text]);

    const handleHoverStart = () => {
        if (!containerRef.current || !animationRef.current || isHovering.current) return;
        isHovering.current = true;

        const currentRotation = gsap.getProperty(containerRef.current, "rotation") as number;

        animationRef.current.kill();

        switch (onHover) {
            case "slowDown":
                animationRef.current = gsap.to(containerRef.current, {
                    rotation: currentRotation + 360,
                    duration: spinDuration * 2,
                    ease: "none",
                    repeat: -1,
                });
                gsap.to(containerRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
                break;

            case "speedUp":
                animationRef.current = gsap.to(containerRef.current, {
                    rotation: currentRotation + 360,
                    duration: spinDuration / 4,
                    ease: "none",
                    repeat: -1,
                });
                gsap.to(containerRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
                break;

            case "pause":
                gsap.to(containerRef.current, {
                    rotation: currentRotation,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                });
                break;

            case "goBonkers":
                animationRef.current = gsap.to(containerRef.current, {
                    rotation: currentRotation + 360,
                    duration: spinDuration / 20,
                    ease: "none",
                    repeat: -1,
                });
                gsap.to(containerRef.current, {
                    scale: 0.8,
                    duration: 0.3,
                    ease: "power2.out",
                });
                break;

            default:
                break;
        }
    };

    const handleHoverEnd = () => {
        if (!containerRef.current || !animationRef.current) return;
        isHovering.current = false;

        const currentRotation = gsap.getProperty(containerRef.current, "rotation") as number;

        animationRef.current.kill();

        // Return to normal speed
        animationRef.current = gsap.to(containerRef.current, {
            rotation: currentRotation + 360,
            duration: spinDuration,
            ease: "none",
            repeat: -1,
        });

        gsap.to(containerRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    return (
        <div className="circular-text--wrapper" onClick={onClick}>
            {icon && <div className="icon">{icon}</div>}
            <div
                ref={containerRef}
                className="circular-text"
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}>
                {letters.map((letter, i) => {
                    const rotationDeg = (360 / letters.length) * i;
                    const factor = Math.PI / letters.length;
                    const x = factor * i;
                    const y = factor * i;
                    const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

                    return (
                        <span key={i} style={{ WebkitTransform: transform }}>
                            {letter}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default CircularText;

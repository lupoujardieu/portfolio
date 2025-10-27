import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./HorizontalScrollText.css";

interface HorizontalScrollTextProps {
    items: string[];
    speed?: number; // base pixels per second
}

const HorizontalScrollText = ({ items, speed = 30 }: HorizontalScrollTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const [shuffledItems, setShuffledItems] = useState<string[]>([]);

    // Shuffle items on mount
    useEffect(() => {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        setShuffledItems(shuffled);
    }, [items]);

    useEffect(() => {
        if (!containerRef.current || !contentRef.current || shuffledItems.length === 0) return;

        const container = containerRef.current;
        const content = contentRef.current;

        gsap.set(content, { force3D: true, willChange: "transform" });

        // Measure total width
        const totalWidth = content.scrollWidth;
        const halfWidth = totalWidth / 2;
        const containerWidth = container.offsetWidth;

        const distance = halfWidth - containerWidth / 2;
        if (distance <= 0) return;

        // Initial duration based on base speed
        let duration = distance / speed;

        // Create GSAP tween
        animationRef.current?.kill();
        animationRef.current = gsap.fromTo(
            content,
            { x: 0 },
            {
                x: -distance,
                duration,
                ease: "none",
                repeat: -1,
                yoyo: true,
            },
        );

        return () => {
            animationRef.current?.kill();
            gsap.set(content, { clearProps: "all" });
        };
    }, [shuffledItems, speed]);

    return (
        <div className="horizontal-scroll--wrapper" ref={containerRef}>
            <div className="horizontal-scroll--content" ref={contentRef}>
                {[...shuffledItems, ...shuffledItems].map((item, i) => (
                    <span key={i}>{item}</span>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScrollText;

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import "./Title.css";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const Title = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const underlineRef = useRef<HTMLDivElement>(null);

    const subtitle = "FullStack Developer";

    useGSAP(
        () => {
            if (!titleRef.current || !subtitleRef.current || !underlineRef.current) return;

            document.fonts.ready.then(() => {
                // --- SplitText for title ---
                const splitTitle = new SplitText(titleRef.current, { type: "chars" });

                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

                // Animate title characters
                tl.from(splitTitle.chars, {
                    opacity: 0,
                    y: 60,
                    rotateX: 90,
                    stagger: 0.04,
                    duration: 0.8,
                });

                // Animate subtitle with ScrambleTextPlugin
                if (subtitleRef.current) {
                    // Make sure subtitle is visible
                    gsap.set(subtitleRef.current, { opacity: 1 });

                    tl.to(
                        subtitleRef.current,
                        {
                            duration: 1.6,
                            scrambleText: {
                                text: subtitle,
                                chars: "0123456789!@#$%^&*<>?/[]{}",
                                revealDelay: 0.4,
                                speed: 0.2,
                            },
                            ease: "power2.out",
                        },
                        "-=0.1",
                    );
                }

                // Animate underline
                tl.fromTo(
                    underlineRef.current,
                    { width: "0%" },
                    { width: "60%", duration: 0.8, ease: "power2.inOut" },
                    "-=0.3",
                );

                // Cleanup SplitText spans on unmount
                return () => splitTitle.revert();
            });
        },
        { scope: containerRef },
    );

    return (
        <div className="title--wrapper" ref={containerRef}>
            <h1 className="title" ref={titleRef}>
                Lucas Poujardieu
            </h1>
            <div className="subtitle-container">
                <h2 className="subtitle" ref={subtitleRef}></h2>
                <div className="subtitle-underline" ref={underlineRef} />
            </div>
        </div>
    );
};

export default Title;

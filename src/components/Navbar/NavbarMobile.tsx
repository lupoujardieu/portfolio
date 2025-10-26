import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface NavbarMobileProps {
    isWrapperAnimated: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const NavbarMobile = ({ isWrapperAnimated, containerRef }: NavbarMobileProps) => {
    const mobileTextRef = useRef<HTMLDivElement>(null);
    const burgerLinesRef = useRef<(HTMLDivElement | null)[]>([]);

    /** Mobile burger lines animation */
    useGSAP(
        () => {
            if (!isWrapperAnimated) return;

            burgerLinesRef.current.forEach((line, i) => {
                if (!line) return;
                gsap.fromTo(
                    line,
                    { scaleX: 0, transformOrigin: "left" },
                    {
                        scaleX: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        delay: 0.2 + i * 0.1,
                        clearProps: "transform",
                    },
                );
            });
        },
        { dependencies: [isWrapperAnimated], scope: containerRef },
    );

    return (
        <button className="navbar-mobile--btn">
            <div className="navbar-mobile--text" ref={mobileTextRef}>
                Menu
            </div>
            <div className="navbar-mobile--burger">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="navbar-mobile--burger-line"
                        ref={(el) => {
                            burgerLinesRef.current[i] = el;
                        }}
                    />
                ))}
            </div>
        </button>
    );
};

export default NavbarMobile;

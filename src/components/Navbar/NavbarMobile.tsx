import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./NavbarMobile.css";
import CircularText from "../CircularText/CircularText";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../../assets/Icons";

interface NavbarMobileProps {
    isWrapperAnimated: boolean;
    navbarItems: { label: string; link: string }[];
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const NavbarMobile = ({ isWrapperAnimated, navbarItems, containerRef }: NavbarMobileProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const mobileTextRef = useRef<HTMLDivElement>(null);
    const burgerLinesRef = useRef<(HTMLDivElement | null)[]>([]);
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const footerRef = useRef<HTMLDivElement>(null);
    const footerIconsRef = useRef<(HTMLDivElement | null)[]>([]);
    const footerTextRef = useRef<HTMLDivElement>(null);

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

    /** Menu open/close animation */
    useGSAP(
        () => {
            if (!menuOverlayRef.current) return;

            if (isMenuOpen) {
                // Animate overlay in
                gsap.to(menuOverlayRef.current, {
                    backgroundColor: "#0000004d",
                    backdropFilter: "blur(30px)",
                    duration: 0.8,
                    ease: "power4.inOut",
                });

                // Stagger menu items in
                gsap.fromTo(
                    menuItemsRef.current.filter(Boolean),
                    {
                        opacity: 1,
                        y: -100,
                        rotateX: 0,
                    },
                    {
                        y: 0,
                        rotateX: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.3,
                        borderBottom: "2px solid var(--white)",
                    },
                );

                // Animate burger to X
                gsap.to(burgerLinesRef.current[0], {
                    rotate: 40,
                    y: 0,
                    duration: 0.3,
                });
                gsap.to(burgerLinesRef.current[1], {
                    opacity: 0,
                    duration: 0.2,
                });
                gsap.to(burgerLinesRef.current[2], {
                    rotate: -40,
                    y: 0,
                    duration: 0.3,
                });

                // Footer wrapper
                gsap.fromTo(
                    footerRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        delay: 0.4,
                    },
                );

                // Footer circular icons
                gsap.fromTo(
                    footerIconsRef.current.filter(Boolean),
                    { opacity: 0, scale: 0.5, y: 20 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "back.out(1.8)",
                        stagger: 0.12,
                        delay: 0.5,
                    },
                );

                // Footer text
                gsap.fromTo(
                    footerTextRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        delay: 0.7,
                    },
                );
            } else {
                // Animate menu items out
                gsap.to(menuItemsRef.current.filter(Boolean), {
                    y: -100,
                    duration: 0.6,
                    stagger: 0.15,
                });
                gsap.to(menuItemsRef.current.filter(Boolean), {
                    opacity: 0,
                    delay: 0.5,
                });

                // Animate overlay out
                gsap.to(menuOverlayRef.current, {
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                    duration: 0.3,
                    ease: "power4.inOut",
                    delay: 0.6,
                });

                // Animate burger back to normal
                gsap.to(burgerLinesRef.current[0], {
                    rotate: 0,
                    y: 0,
                    duration: 0.3,
                });
                gsap.to(burgerLinesRef.current[1], {
                    opacity: 1,
                    duration: 0.2,
                    delay: 0.1,
                });
                gsap.to(burgerLinesRef.current[2], {
                    rotate: 0,
                    y: 0,
                    duration: 0.3,
                });

                // Reverse the footer
                gsap.to([footerRef.current, footerTextRef.current, ...footerIconsRef.current.filter(Boolean)], {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    stagger: 0.05,
                });
            }
        },
        { dependencies: [isMenuOpen], scope: containerRef },
    );

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <button className={`navbar-mobile--btn ${isMenuOpen ? "open" : ""}`} onClick={handleMenuToggle}>
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

            <div className={`navbar-mobile--menu-overlay ${isMenuOpen ? "open" : ""}`} ref={menuOverlayRef}>
                <nav className="navbar-mobile--menu-content">
                    {navbarItems.map((item, index) => (
                        <div key={item.label} className="navbar-mobile--menu-item">
                            <a
                                href={item.link}
                                onClick={handleLinkClick}
                                ref={(el) => {
                                    menuItemsRef.current[index] = el;
                                }}>
                                {item.label}
                            </a>
                        </div>
                    ))}
                </nav>

                <footer className="navbar-mobile--menu-footer" ref={footerRef}>
                    <div className="circular--wrapper">
                        {[
                            <CircularText
                                text="LINKEDIN * LINKEDIN * LINKEDIN * "
                                spinDuration={50}
                                onHover="goBonkers"
                                onClick={() => window.open("https://www.linkedin.com/in/lucas-poujardieu/")}
                                icon={<LinkedinIcon color="#fff" />}
                            />,
                            <CircularText
                                text="GITHUB * GITHUB * GITHUB * "
                                spinDuration={50}
                                onHover="goBonkers"
                                onClick={() => window.open("https://github.com/lupoujardieu")}
                                icon={<GithubIcon color="#fff" />}
                            />,
                            <CircularText
                                text="TWITTER * X * TWITTER * X * "
                                spinDuration={50}
                                onHover="goBonkers"
                                onClick={() => window.open("https://x.com/PoujardieuL")}
                                icon={<TwitterIcon color="#fff" />}
                            />,
                        ].map((item, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    footerIconsRef.current[i] = el;
                                }}
                                className="footer-icon-wrapper">
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="navbar-mobile--menu-footer-text" ref={footerTextRef}>
                        <a href="mailto:lucas.poujardieu@gmail.com">Contactez moi ici</a>
                        <div className="text">©{new Date().getFullYear()} ALL RIGHTS RESERVED</div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default NavbarMobile;

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./Navbar.css";

const Navbar = () => {
    const IS_MOBILE_VALUE = 768;
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("FR");

    const containerRef = useRef<HTMLDivElement>(null);
    const navbarWrapperRef = useRef<HTMLElement>(null);
    const navbarItemsRef = useRef<HTMLDivElement>(null);
    const selectContainerRef = useRef<HTMLDivElement>(null);
    const mobileTextRef = useRef<HTMLDivElement>(null);
    const burgerLinesRef = useRef<(HTMLDivElement | null)[]>([]);
    const menuRef = useRef<HTMLUListElement>(null);
    const isFirstRenderRef = useRef(true);

    const languages = [
        { value: "fr", label: "FR" },
        { value: "en", label: "EN" },
    ];

    const handleSelect = (label: string) => {
        setSelected(label);
        setIsOpen(false);
    };

    // Initial navbar wrapper animation
    useGSAP(
        () => {
            if (navbarWrapperRef.current) {
                gsap.fromTo(
                    navbarWrapperRef.current,
                    { scaleY: 0, transformOrigin: "bottom" },
                    { scaleY: 1, duration: 0.6, ease: "power2.out" },
                );
            }
        },
        { scope: containerRef },
    );

    // Desktop items animation
    useGSAP(
        () => {
            if (!isMobile && navbarItemsRef.current && !isFirstRenderRef.current) {
                gsap.fromTo(
                    navbarItemsRef.current,
                    { x: "-100%", visibility: "hidden" },
                    {
                        x: "0%",
                        visibility: "visible",
                        duration: 1,
                        ease: "power2.out",
                        delay: 0.3,
                    },
                );
            }

            if (!isMobile && selectContainerRef.current && !isFirstRenderRef.current) {
                gsap.fromTo(
                    selectContainerRef.current,
                    { scale: 0 },
                    {
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        delay: 1.2,
                    },
                );
            }
        },
        { dependencies: [isMobile], scope: containerRef },
    );

    // Mobile animations
    useGSAP(
        () => {
            if (isMobile && burgerLinesRef.current.length > 0) {
                burgerLinesRef.current.forEach((line, index) => {
                    if (line) {
                        gsap.fromTo(
                            line,
                            { scaleX: 0, transformOrigin: "left" },
                            {
                                scaleX: 1,
                                duration: 0.4,
                                ease: "power2.out",
                                delay: 0.4 + index * 0.1,
                            },
                        );
                    }
                });
            }
        },
        { dependencies: [isMobile], scope: containerRef },
    );

    // Dropdown menu animation
    useGSAP(
        () => {
            if (menuRef.current) {
                if (isOpen) {
                    gsap.to(menuRef.current, {
                        visibility: "visible",
                        opacity: 1,
                        y: 0,
                        duration: 0.2,
                        ease: "power2.out",
                    });
                } else {
                    gsap.to(menuRef.current, {
                        visibility: "hidden",
                        opacity: 0,
                        y: -50,
                        duration: 0.2,
                        ease: "power2.out",
                    });
                }
            }
        },
        { dependencies: [isOpen], scope: containerRef, revertOnUpdate: true },
    );

    useEffect(() => {
        const checkMobile = () => {
            const newIsMobile = window.innerWidth <= IS_MOBILE_VALUE;
            if (newIsMobile !== isMobile) {
                setIsOpen(false); // Close dropdown when switching between mobile/desktop
            }
            setIsMobile(newIsMobile);
        };
        checkMobile();

        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
        }

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [isMobile]);

    return (
        <div ref={containerRef}>
            <nav className="navbar--wrapper" ref={navbarWrapperRef}>
                {isMobile ? (
                    <button className="navbar-mobile--btn">
                        <div className="navbar-mobile--text" ref={mobileTextRef}>
                            Menu
                        </div>
                        <div className="navbar-mobile--burger">
                            <div
                                className="navbar-mobile--burger-line"
                                ref={(el) => {
                                    burgerLinesRef.current[0] = el;
                                }}></div>
                            <div
                                className="navbar-mobile--burger-line"
                                ref={(el) => {
                                    burgerLinesRef.current[1] = el;
                                }}></div>
                            <div
                                className="navbar-mobile--burger-line"
                                ref={(el) => {
                                    burgerLinesRef.current[2] = el;
                                }}></div>
                        </div>
                    </button>
                ) : (
                    <div className="navbar--items" ref={navbarItemsRef}>
                        <div className="navbar--item">
                            <a href="#">à propos</a>
                        </div>
                        <div className="navbar--item">
                            <a href="#">projets</a>
                        </div>
                        <div className="navbar--item">
                            <a href="#">contacts</a>
                        </div>
                        <div className="navbar--item" ref={selectContainerRef}>
                            <div className="custom-select">
                                <button className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                                    <span>{selected}</span>
                                    <img
                                        className={`arrow ${isOpen ? "open" : ""}`}
                                        src="/imgs/picker.svg"
                                        alt="select-picker"
                                    />
                                </button>
                                <ul className="select-menu" ref={menuRef}>
                                    {languages
                                        .filter((lang) => lang.label !== selected)
                                        .map((lang) => (
                                            <li
                                                key={lang.value}
                                                className="select-option"
                                                onClick={() => handleSelect(lang.label)}>
                                                {lang.label}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;

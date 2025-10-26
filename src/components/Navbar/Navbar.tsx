import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./Navbar.css";

const IS_MOBILE_BREAKPOINT = 768;

const LANGUAGES = [
    { value: "fr", label: "FR" },
    { value: "en", label: "EN" },
];

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("FR");
    const [isWrapperAnimated, setIsWrapperAnimated] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const navbarWrapperRef = useRef<HTMLElement>(null);
    const navbarItemsRef = useRef<HTMLDivElement>(null);
    const selectContainerRef = useRef<HTMLDivElement>(null);
    const mobileTextRef = useRef<HTMLDivElement>(null);
    const burgerLinesRef = useRef<(HTMLDivElement | null)[]>([]);
    const menuRef = useRef<HTMLUListElement>(null);
    const linkHoverTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map());
    const isFirstRender = useRef(true);

    /** Handle language selection */
    const handleSelect = (label: string) => {
        setSelected(label);
        setIsOpen(false);
    };

    /** Animate navbar wrapper on mount */
    useGSAP(
        () => {
            if (!navbarWrapperRef.current) return;
            gsap.fromTo(
                navbarWrapperRef.current,
                { scaleY: 0, transformOrigin: "bottom" },
                {
                    scaleY: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => setIsWrapperAnimated(true),
                },
            );
        },
        { scope: containerRef },
    );

    /** Desktop entrance animations */
    useGSAP(
        () => {
            if (isMobile || isFirstRender.current) return;

            if (navbarItemsRef.current) {
                gsap.fromTo(
                    navbarItemsRef.current,
                    { x: "-100%", visibility: "hidden" },
                    { x: "0%", visibility: "visible", duration: 1, ease: "power2.out", delay: 0.3 },
                );
            }

            if (selectContainerRef.current) {
                gsap.fromTo(
                    selectContainerRef.current,
                    { scale: 0 },
                    { scale: 1, duration: 0.4, ease: "power2.out", delay: 1.2 },
                );
            }
        },
        { dependencies: [isMobile], scope: containerRef },
    );

    /** Mobile animations */
    useGSAP(
        () => {
            if (!isMobile || !isWrapperAnimated) return;

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
        { dependencies: [isMobile, isWrapperAnimated], scope: containerRef },
    );

    /** Dropdown animation */
    useGSAP(
        () => {
            if (!menuRef.current) return;
            gsap.to(menuRef.current, {
                visibility: isOpen ? "visible" : "hidden",
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : -50,
                duration: 0.2,
                ease: "power2.out",
            });
        },
        { dependencies: [isOpen], scope: containerRef, revertOnUpdate: true },
    );

    /** Link hover underline animation */
    useGSAP(
        () => {
            if (isMobile || !navbarItemsRef.current) return;

            const links = navbarItemsRef.current.querySelectorAll(".navbar--item a");

            links.forEach((link) => {
                const afterEl = document.createElement("div");
                afterEl.className = "link-after";
                link.appendChild(afterEl);

                const handleEnter = () => {
                    let tween = linkHoverTweens.current.get(link as HTMLElement);
                    if (!tween) {
                        tween = gsap.to(afterEl, { width: "60%", duration: 0.4, ease: "power2.out", paused: true });
                        linkHoverTweens.current.set(link as HTMLElement, tween);
                    }
                    tween.play();
                };

                const handleLeave = () => linkHoverTweens.current.get(link as HTMLElement)?.reverse();

                link.addEventListener("mouseenter", handleEnter);
                link.addEventListener("mouseleave", handleLeave);
            });

            return () => {
                linkHoverTweens.current.forEach((tween) => tween.kill());
                linkHoverTweens.current.clear();
            };
        },
        { dependencies: [isMobile], scope: containerRef },
    );

    /** Handle resize responsiveness */
    useEffect(() => {
        const checkMobile = () => {
            const newIsMobile = window.innerWidth <= IS_MOBILE_BREAKPOINT;
            if (newIsMobile !== isMobile) setIsOpen(false);
            setIsMobile(newIsMobile);
        };

        checkMobile();
        if (isFirstRender.current) isFirstRender.current = false;

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
                ) : (
                    <div className="navbar--items" ref={navbarItemsRef}>
                        {["à propos", "projets", "contacts"].map((label) => (
                            <div className="navbar--item" key={label}>
                                <a href="#">{label}</a>
                            </div>
                        ))}

                        <div className="navbar--item" ref={selectContainerRef}>
                            <div className="custom-select">
                                <button className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                                    <span>{selected}</span>
                                    <img
                                        className={`arrow ${isOpen ? "open" : ""}`}
                                        src="/imgs/picker.svg"
                                        alt="select picker"
                                    />
                                </button>

                                <ul className="select-menu" ref={menuRef}>
                                    {LANGUAGES.filter((lang) => lang.label !== selected).map((lang) => (
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

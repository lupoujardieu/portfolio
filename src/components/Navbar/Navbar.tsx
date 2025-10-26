import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import NavbarMobile from "./NavBarMobile";
import NavbarSelect from "./NavbarSelect";
import "./Navbar.css";

const IS_MOBILE_BREAKPOINT = 768;

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isWrapperAnimated, setIsWrapperAnimated] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const navbarWrapperRef = useRef<HTMLElement>(null);
    const navbarItemsRef = useRef<HTMLDivElement>(null);
    const selectContainerRef = useRef<HTMLDivElement>(null);
    const linkHoverTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map());
    const isFirstRender = useRef(true);

    const navbarItems = ["à propos", "projets", "contacts"];

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
                        tween = gsap.to(afterEl, { width: "60%", duration: 0.2, ease: "power1.out", paused: false });
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
                    <NavbarMobile isWrapperAnimated={isWrapperAnimated} containerRef={containerRef} />
                ) : (
                    <div className="navbar--items" ref={navbarItemsRef}>
                        {navbarItems.map((label) => (
                            <div className="navbar--item" key={label}>
                                <a href="#">{label}</a>
                            </div>
                        ))}

                        <div className="navbar--item" ref={selectContainerRef}>
                            <NavbarSelect containerRef={containerRef} />
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;

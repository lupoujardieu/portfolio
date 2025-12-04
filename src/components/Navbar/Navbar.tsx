import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import NavbarMobile from "./NavbarMobile";
import NavbarSelect from "./NavbarSelect";
import "./Navbar.css";

const IS_MOBILE_BREAKPOINT = 768;
const SCROLL_THRESHOLD = 8; // px before navbar switches style
const THEME_START_OFFSET = 100; // px offset: theme activates when section bottom reaches viewport bottom + this offset

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isWrapperAnimated, setIsWrapperAnimated] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const navbarWrapperRef = useRef<HTMLElement>(null);
    const navbarItemsRef = useRef<HTMLDivElement>(null);
    const selectContainerRef = useRef<HTMLDivElement>(null);
    const linkHoverTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map());
    const isFirstRender = useRef(true);

    const navbarItems = [
        { label: "à propos", link: "#about-me" },
        { label: "projets", link: "#" },
        { label: "contact", link: "#" },
    ];

    // Section-based themes (selector -> navbar theme). Add more entries for new sections
    // color: background color (when scrolled)
    // borderColor: bottom border color (when scrolled)
    // textColor: text/link color (when scrolled)
    // fontFamily: font-family to apply (when scrolled)
    const SECTION_THEMES: {
        trigger: string;
        color?: string;
        borderColor?: string;
        textColor?: string;
        fontFamily?: string;
    }[] = [
        {
            trigger: ".about-section",
            color: "var(--secondary-color)",
            borderColor: "var(--heading-text)",
            textColor: "var(--heading-text)",
        },
        // Examples:
        // { trigger: ".projects-section", color: "#222244", borderColor: "#445", textColor: "#eef", fontFamily: "'Inter', system-ui, sans-serif" },
        // { trigger: "#contact", color: "rgba(10, 10, 10, 0.8)", borderColor: "transparent", textColor: "#fff" },
    ];

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

    /** Scroll state (color/size change when scrolling) handled by GSAP ScrollTrigger */
    useGSAP(
        () => {
            if (!navbarWrapperRef.current) return;

            // Ensure initial state on mount
            const apply = (scrollY: number) => {
                const scrolled = scrollY > SCROLL_THRESHOLD;
                navbarWrapperRef.current?.classList.toggle("scrolled", scrolled);
            };
            apply(window.scrollY);

            const st = ScrollTrigger.create({
                onUpdate: (self) => apply(self.scroll()),
            });

            return () => {
                st.kill();
            };
        },
        { scope: containerRef },
    );

    /** Section-based navbar theming (bg, border, text color, font) */
    useGSAP(
        () => {
            const wrapper = navbarWrapperRef.current;
            if (!wrapper || SECTION_THEMES.length === 0) return;

            // Helper to set/remove CSS variables for the theme
            const setTheme = (
                cfg?: {
                    color?: string;
                    borderColor?: string;
                    textColor?: string;
                    fontFamily?: string;
                } | null,
            ) => {
                if (!wrapper) return;
                const setOrRemove = (name: string, value?: string) => {
                    if (value) wrapper.style.setProperty(name, value);
                    else wrapper.style.removeProperty(name);
                };
                setOrRemove("--navbar-color", cfg?.color);
                setOrRemove("--navbar-border-color", cfg?.borderColor);
                setOrRemove("--navbar-text-color", cfg?.textColor);
                setOrRemove("--navbar-font-family", cfg?.fontFamily);
            };

            // Initial state: activate theme only when we have reached the bottom of a section
            // Criteria: section bottom has crossed the viewport bottom (with optional offset),
            // pick the last section that matches.
            const viewportBottom = window.innerHeight + THEME_START_OFFSET;
            let lastMatch: (typeof SECTION_THEMES)[number] | null = null;
            for (const cfg of SECTION_THEMES) {
                const el = document.querySelector(cfg.trigger) as HTMLElement | null;
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                // bottom crossed viewport bottom AND section is at least partially visible
                const bottomCrossed = rect.bottom <= viewportBottom;
                const visible = rect.bottom > 0 && rect.top < window.innerHeight;
                if (bottomCrossed && visible) {
                    lastMatch = cfg;
                }
            }
            if (lastMatch) setTheme(lastMatch);
            else setTheme(null);

            // Create a ScrollTrigger per section to update theme when entering/leaving
            const triggers: ScrollTrigger[] = [];
            SECTION_THEMES.forEach((cfg) => {
                const el = document.querySelector(cfg.trigger) as HTMLElement | null;
                if (!el) return;

                const st = ScrollTrigger.create({
                    trigger: el,
                    start: `bottom bottom+=${THEME_START_OFFSET}`,
                    onEnter: () => setTheme(cfg),
                    onEnterBack: () => setTheme(cfg),
                    onLeaveBack: () => setTheme(null),
                    invalidateOnRefresh: true,
                });
                triggers.push(st);
            });

            return () => {
                triggers.forEach((t) => t.kill());
            };
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef}>
            <nav className="navbar--wrapper" ref={navbarWrapperRef}>
                {isMobile ? (
                    <NavbarMobile isWrapperAnimated={isWrapperAnimated} containerRef={containerRef} />
                ) : (
                    <div className="navbar--items" ref={navbarItemsRef}>
                        {navbarItems.map((item) => (
                            <div className="navbar--item" key={item.label}>
                                <a href={item.link}>{item.label}</a>
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

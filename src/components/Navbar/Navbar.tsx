import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import NavbarMobile from "./NavbarMobile";
import NavbarSelect from "./NavbarSelect";
import "./Navbar.css";

interface Theme {
    trigger: string;
    color?: string;
    borderColor?: string;
    textColor?: string;
    fontFamily?: string;
}

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
        { label: "projets", link: "#projets" },
        { label: "contact", link: "#" },
    ];

    const SECTION_THEMES: Theme[] = [
        {
            trigger: ".about-section",
            color: "var(--secondary-color)",
            borderColor: "var(--heading-text)",
            textColor: "var(--heading-text)",
        },
        {
            trigger: ".projets-section",
            color: "var(--white)",
            borderColor: "var(--primary-color)",
            textColor: "var(--primary-color)",
        },
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
    useGSAP(() => {
        const wrapper = navbarWrapperRef.current;
        if (!wrapper || SECTION_THEMES.length === 0) return;

        // Helper to set/remove CSS variables for the theme
        const setTheme = (cfg?: Theme | null) => {
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

        // Function to determine which theme should be active based on current scroll position
        const getActiveTheme = () => {
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
            return lastMatch;
        };

        // Set initial theme
        setTheme(getActiveTheme());

        // Create a ScrollTrigger per section to update theme when entering/leaving
        const triggers: ScrollTrigger[] = [];
        SECTION_THEMES.forEach((cfg) => {
            const el = document.querySelector(cfg.trigger) as HTMLElement | null;
            if (!el) return;

            const st = ScrollTrigger.create({
                trigger: el,
                start: `bottom bottom+=${THEME_START_OFFSET}`,
                onEnter: () => setTheme(getActiveTheme()),
                onEnterBack: () => setTheme(getActiveTheme()),
                onLeave: () => setTheme(getActiveTheme()),
                onLeaveBack: () => setTheme(getActiveTheme()),
                invalidateOnRefresh: true,
            });
            triggers.push(st);
        });

        return () => {
            triggers.forEach((t) => t.kill());
        };
    });

    return (
        <div ref={containerRef}>
            <nav className="navbar--wrapper" ref={navbarWrapperRef}>
                {isMobile ? (
                    <NavbarMobile
                        isWrapperAnimated={isWrapperAnimated}
                        navbarItems={navbarItems}
                        containerRef={containerRef}
                    />
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

import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
    const IS_MOBILE_VALUE = 768;
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("FR");
    const menuRef = useRef(null);
    const isFirstRenderRef = useRef(true);

    const languages = [
        { value: "fr", label: "FR" },
        { value: "en", label: "EN" },
    ];

    const handleSelect = (label: string) => {
        setSelected(label);
        setIsOpen(false);
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= IS_MOBILE_VALUE);
        checkMobile();

        // Mark first render as complete after initial check
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
        }

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <nav className="navbar--wrapper">
            {isMobile ? (
                <button className="navbar-mobile--btn">
                    <div className="navbar-mobile--text">Menu</div>
                    <div className="navbar-mobile--burger">
                        <div className="navbar-mobile--burger-line"></div>
                        <div className="navbar-mobile--burger-line"></div>
                        <div className="navbar-mobile--burger-line"></div>
                    </div>
                </button>
            ) : (
                <div className="navbar--items" style={!isFirstRenderRef.current ? { animationDelay: "0s" } : {}}>
                    <div className="navbar--item">
                        <a href="#">à propos</a>
                    </div>
                    <div className="navbar--item">
                        <a href="#">projets</a>
                    </div>
                    <div className="navbar--item">
                        <a href="#">contacts</a>
                    </div>
                    <div className="navbar--item">
                        <div className="custom-select">
                            <button className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                                <span>{selected}</span>
                                <img
                                    className={`arrow ${isOpen ? "open" : ""}`}
                                    src="/imgs/picker.svg"
                                    alt="select-picker"
                                />
                            </button>
                            <ul className="select-menu" ref={menuRef} data-open={isOpen}>
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
    );
};

export default Navbar;

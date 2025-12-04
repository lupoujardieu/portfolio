import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { PickerIcon } from "../../assets/Icons";

interface NavbarSelectProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const LANGUAGES = [
    { value: "fr", label: "FR" },
    { value: "en", label: "EN" },
];

const NavbarSelect = ({}: NavbarSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("FR");
    const selectContainerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    /** Handle language selection */
    const handleSelect = (label: string) => {
        setSelected(label);
        setIsOpen(false);
    };

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
        { dependencies: [isOpen], scope: selectContainerRef, revertOnUpdate: true },
    );

    return (
        <div className="custom-select" ref={selectContainerRef}>
            <button className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                <span>{selected}</span>
                <PickerIcon className={`arrow ${isOpen ? "open" : ""}`} />
            </button>

            <ul className="select-menu" ref={menuRef}>
                {LANGUAGES.filter((lang) => lang.label !== selected).map((lang) => (
                    <li key={lang.value} className="select-option" onClick={() => handleSelect(lang.label)}>
                        {lang.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavbarSelect;

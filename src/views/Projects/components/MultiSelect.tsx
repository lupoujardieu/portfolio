import React, { useState, useRef, useEffect } from "react";
import "./MultiSelect.css";

interface MultiSelectProps {
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
    label?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = options.filter((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase()));

    const toggleOption = (option: string): void => {
        if (value.includes(option)) {
            onChange(value.filter((v) => v !== option));
        } else {
            onChange([...value, option]);
        }
    };

    const removeOption = (option: string): void => {
        onChange(value.filter((v) => v !== option));
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className="multiselect-container" ref={containerRef}>
            {label && <label className="multiselect-label">{label}</label>}

            <div className={`multiselect-wrapper ${isOpen ? "open" : ""}`}>
                <div className="multiselect-input-area" onClick={() => setIsOpen(true)}>
                    <div className="multiselect-chips">
                        {value.map((v) => (
                            <span key={v} className="multiselect-chip">
                                {v}
                                <button
                                    type="button"
                                    className="chip-remove"
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        removeOption(v);
                                    }}>
                                    ×
                                </button>
                            </span>
                        ))}
                        <input
                            ref={inputRef}
                            type="text"
                            className="multiselect-search"
                            placeholder={value.length === 0 ? "Rechercher..." : ""}
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                        />
                    </div>
                    <button
                        type="button"
                        className="multiselect-arrow"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}>
                        {isOpen ? "▲" : "▼"}
                    </button>
                </div>

                {isOpen && (
                    <div className="multiselect-dropdown">
                        {filteredOptions.length === 0 ? (
                            <div className="multiselect-option no-results">Aucun résultat</div>
                        ) : (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt}
                                    className={`multiselect-option ${value.includes(opt) ? "selected" : ""}`}
                                    onClick={() => toggleOption(opt)}>
                                    <div className="option-checkbox">{value.includes(opt) && "✓"}</div>
                                    <span className="option-text">{opt}</span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;

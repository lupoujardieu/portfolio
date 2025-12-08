import type { MouseEventHandler } from "react";
import "./Button.css";

interface ButtonProps {
    text: string;
    type: "main" | "clear";
    onClick: MouseEventHandler;
}

const Button = ({ text, type, onClick }: ButtonProps) => {
    return (
        <button className={`btn ${type}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;

import "./Button.css";

interface ButtonProps {
    text: string;
    type: "main" | "clear";
}

const Button = ({ text, type }: ButtonProps) => {
    return <button className={`btn ${type}`}>{text}</button>;
};

export default Button;

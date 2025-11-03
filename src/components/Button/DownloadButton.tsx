import "./Button.css";

interface DownloadButtonProps {
    text: string;
    attachement: string;
    attachementType: string;
    type: "main" | "clear";
}

const DownloadButton = ({ text, attachement, attachementType, type }: DownloadButtonProps) => {
    return (
        <a className={`btn ${type}`} href={attachement} download={attachementType}>
            {text}
        </a>
    );
};

export default DownloadButton;

import "./ScrolldownBtn.css";

const ScrollDownBtn = () => {
    return (
        <button className="scrolldown-btn" onClick={() => (window.location.href = "#about-me")}>
            Découvrir mon histoire
        </button>
    );
};

export default ScrollDownBtn;

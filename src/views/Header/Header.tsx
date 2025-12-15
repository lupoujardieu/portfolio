import ScrollDownBtn from "./components/ScrolldownBtn/ScrolldownBtn";
import LandingExperience from "./components/SideContent/LandingExperience";
import Title from "./components/Title/Title";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <Title />
            <LandingExperience />
            <ScrollDownBtn />
        </header>
    );
};

export default Header;

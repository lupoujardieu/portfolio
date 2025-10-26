import LandingExperience from "./components/SideContent/LandingExperience";
import Title from "./components/Title/Title";
import "./Header.css";

const Header = () => {
    return (
        <header>
            <Title />
            <LandingExperience />
        </header>
    );
};

export default Header;

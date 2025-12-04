import Navbar from "../components/Navbar/Navbar";
import About from "./About/About";
import "./App.css";
import Header from "./Header/Header";
import Projets from "./Projects/Projets";

function App() {
    return (
        <div className="app--wrapper">
            <Navbar />
            <Header />
            <About />
            <Projets />
        </div>
    );
}

export default App;

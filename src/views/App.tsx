import Navbar from "../components/Navbar/Navbar";
import About from "./About/About";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Projets from "./Projects/Projets";

function App() {
    return (
        <div className="app--wrapper">
            <Navbar />
            <Header />
            <About />
            <Projets />
            <Footer />
        </div>
    );
}

export default App;

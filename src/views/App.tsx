import Navbar from "../components/Navbar/Navbar";
import About from "./About/About";
import "./App.css";
import Header from "./Header/Header";

function App() {
    return (
        <div className="app--wrapper">
            <Navbar />
            <Header />
            <About />
        </div>
    );
}

export default App;

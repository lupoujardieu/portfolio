import Navbar from "../components/Navbar/Navbar";
import "./App.css";
import Header from "./Header/Header";

function App() {
    return (
        <div className="app--wrapper">
            <Navbar />
            <div className="content--wrapper">
                <Header />
            </div>
        </div>
    );
}

export default App;

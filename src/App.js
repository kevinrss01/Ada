
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import './style/sass/main.scss'
import {HomePage} from './pages/HomePage';
import {Navbar} from './pages/Navbar';

function App() {
  return (
    <Router>
        <div className="app">
            <div className="navbarContainer">
                <Link to="/"><h1>Accueil</h1></Link>
            </div>
            <div className="routes">
                <Routes>
                    <Route path="/" element={HomePage}></Route>
                </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;

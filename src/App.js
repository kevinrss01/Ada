import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/sass/main.scss";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./pages/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

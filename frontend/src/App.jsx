import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/Notes/noteState";
import Alert from "./components/Alert";
const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="Welcome To i_Notebook"/>
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
};

export default App;

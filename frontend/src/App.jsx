import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/Notes/noteState";
import AlertState from "./Context/Alert/alertState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
const App = () => {
  return (
    <>
      <NoteState>
        <AlertState>
          <Router>
            <Navbar />
            <Alert message="Welcome To i_Notebook" />
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </AlertState>
      </NoteState>
    </>
  );
};

export default App;

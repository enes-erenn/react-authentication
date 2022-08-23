import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path="/" element={<p>Home Page</p>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

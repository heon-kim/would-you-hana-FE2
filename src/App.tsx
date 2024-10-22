import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary routing components
import LandingPage from "./pages/LandingPage";
import "./App.css";
import "./styles/fonts.css";
import Header from "./components/Header";
import QuestionRegisterPage from "./pages/QuestionRegisterPage";

function App() {
  return (
    <Router>
      <Header></Header>
      <div>
        {/* Define the routes for your application */}
        <Routes>
          {/* Default route: LandingPage will be rendered when visiting '/' */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/registqna" element={<QuestionRegisterPage/>}/>
          {/* You can add other routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

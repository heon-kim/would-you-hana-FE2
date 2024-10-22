import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
// import Likes from "./pages/Likes";
// import Scrap from "./pages/Scrap";
// import EditProfile from "./pages/EditProfile"; 
// import Auth from "./pages/Auth"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import "./styles/fonts.css";
import Header from "./components/Header";
import QuestionRegister from "./pages/QuestionRegister";

function App() {
  return (
    <Router>
      <div className="h-dvh flex flex-col">
        <Header></Header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/my" element={<MyPage />}>
            <Route path="profile" element={<Profile />} />
            <Route path="posts" element={<Posts />} />
            {/*Route path="likes" element={<Likes />} />
            <Route path="scrap" element={<Scrap />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="auth" element={<Auth />} /> */}
          </Route>
          {/* You can add other routes here as needed */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registqna" element={<QuestionRegister/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

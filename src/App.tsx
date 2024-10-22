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
import "./App.css";
import "./styles/fonts.css";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div>
        {/* Define the routes for your application */}
        <Routes>
          {/* Default route: LandingPage will be rendered when visiting '/' */}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

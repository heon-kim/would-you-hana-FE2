import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Home from './pages/Home/Home';
import MyPage from './pages/MyPage/MyPage';
import Profile from './pages/MyPage/Profile';
import Posts from './pages/MyPage/Posts';
// import Likes from "./pages/Likes";
// import Scrap from "./pages/Scrap";
// import EditProfile from "./pages/EditProfile";
// import Auth from "./pages/Auth";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Interest from './pages/Auth/Interest';
import './App.css';
import './styles/fonts.css';
import Header from './components/Header';
import QuestionRegister from './pages/QnA/QuestionRegister';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#008485',
        },
      }}
    >
      <Router>
        <div className="h-dvh flex flex-col">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/interest" element={<Interest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registqna" element={<QuestionRegister />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;

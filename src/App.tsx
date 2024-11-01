import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Home from './pages/Home/Home';
import MyPage from './pages/MyPage/MyPage';
import Profile from './pages/MyPage/Profile';
import Posts from './pages/MyPage/Posts';
import Likes from './pages/MyPage/Likes';
import Scrap from './pages/MyPage/Scraps';
import EditProfile from './pages/MyPage/EditProfile';
// import Auth from "./pages/Auth";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import './App.css';
import './styles/fonts.css';
import Header from './components/Header';
import QuestionDetail from './pages/QnA/QuestionDetail';
import QuestionRegister from './pages/QnA/QuestionRegister';
import Board from './pages/QnA/Board';
import FindBank from './pages/Location/FindBank';
import NotFound from './pages/Error/404';
import Community from './pages/Community/community';

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
              <Route path="likes" element={<Likes />} />
              <Route path="scrap" element={<Scrap />} />
              <Route path="edit" element={<EditProfile />} />
              {/*<Route path="auth" element={<Auth />} /> */}
            </Route>
            {/* You can add other routes here as needed */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/qna" element={<Board />} />
            <Route path="/qna/regist" element={<QuestionRegister />} />
            <Route path="/qna/detail/:postId" element={<QuestionDetail />} />
            <Route path="/findbank" element={<FindBank />} />
            <Route path="/community" element={<Community />} />
            {/* Error */}
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;

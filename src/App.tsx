import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

// Pages
import Home from "./pages/Home/Home";
import MyPage from "./pages/MyPage/MyPage";
import Profile from "./pages/MyPage/Profile";
import Posts from "./pages/MyPage/Posts";
import Likes from "./pages/MyPage/Likes";
import Scrap from "./pages/MyPage/Scraps";
import EditProfile from "./pages/MyPage/EditProfile";
import Login from "./pages/Auth/Login";
import FindPassword from "./pages/Auth/FindPassword";
import QuestionDetail from "./pages/QnA/QuestionDetail";
import QuestionRegister from "./pages/QnA/QuestionRegister";
import Board from "./pages/QnA/Board";
import FindBank from "./pages/Location/FindBank";
import NotFound from "./pages/Error/404";
import Community from "./pages/Community/Community";
import BankerProfile from './pages/BankerProfile/Profile';
import CommunityRegister from './pages/Community/CommunityRegister';
import UserRegister from "./pages/Auth/UserRegister";
import BankerRegister from './pages/Auth/BankerRegister';
import LandingForRegister from './pages/Auth/LandingForRegister';
import CommunityDetail from "./pages/Community/CommunityDetail";
import SetDistrict from "./pages/MyPage/SetDistrict";
import Header from "./components/Header";
import District from './pages/LandingPage/District';

// Styles
import "./App.css";
import "./styles/fonts.css";

function App() {
  return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#008485",
          },
          components:{
            Menu:{
              itemSelectedBg: "#ffffff",
            }
          }
        }}
      >
        <Router>
          <div className="h-dvh flex flex-col">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my" element={<MyPage />}>
                <Route path="profile" element={<Profile />} />
                <Route path="posts" element={<Posts />} />
                <Route path="likes" element={<Likes />} />
                <Route path="scrap" element={<Scrap />} />
                <Route path="edit" element={<EditProfile />} />
                <Route path="district" element={<SetDistrict />} />
              </Route>
              <Route path="/register" element={<LandingForRegister />} />
              <Route path="/register/user" element={<UserRegister />} />
              <Route path="/register/banker" element={<BankerRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/findPassword" element={<FindPassword />} />
              <Route path="/qna" element={<Board />} />
              <Route path="/qna/regist" element={<QuestionRegister />} />
              <Route path="/qna/detail/:postId" element={<QuestionDetail />} />
              <Route path="/findbank" element={<FindBank />} />
              <Route path="/community">
                <Route index element={<Community />} />
                <Route path="regist" element={<CommunityRegister />} />
                <Route path="detail/:postId" element={<CommunityDetail />} />
              </Route>
              <Route path="/district/:districtId" element={<District />} />
              <Route path="/bankerProfile" element={<BankerProfile />} />

              {/* Error */}
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ConfigProvider>
  );
}

export default App;

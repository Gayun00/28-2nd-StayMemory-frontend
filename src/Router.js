import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './pages/List/List';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import SignUp from './pages/SignUp/SignUp';
import Detail from './pages/Detail/Detail';
import MyPage from './pages/MyPage/MyPage';
import Nav from './components/Nav/Nav';
import KakaoLogin from './pages/Login/KakaoLogin';
import Admin from './pages/Admin/Admin';
import { RecoilRoot } from 'recoil';
export default function Router() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/list" element={<List />} />
          <Route path="/findstay/:id" element={<Detail />} />
          <Route path="/mypage/:page" element={<MyPage />} />
          <Route path="/signin_kakao" element={<KakaoLogin />} />
          <Route path="/admin/:id" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

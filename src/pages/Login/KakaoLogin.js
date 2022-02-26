import { useEffect } from 'react';
import { resetItToDefaultState } from 'react-date-range-calendar/lib/scripts';
import { useNavigate, useSearchParams } from 'react-router-dom';
function KakaoLogin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_API_KEY;
  // const API_KEY = '61d21cb7cc0fa85b881660e01f84c54b';
  // const CLIENT_SECRET = '8WF6yOVTDxc36khE3GHGZNB9Oc1otlk2';
  // console.log(CLIENT_SECRET);
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  console.log(API_KEY, CLIENT_SECRET);

  useEffect(() => {
    getKakaoToken();
  }, []);

  const getKakaoToken = async () => {
    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${API_KEY}&${searchParams}&client_secret=${CLIENT_SECRET}`,
    });
    const resJson = await res.json();
    const accessToken = resJson.access_token;
    console.log(accessToken);
    getLoginToken(accessToken);
  };

  const getLoginToken = async kakaoToken => {
    const res = await fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/users/signin-kakao`,
      {
        method: 'POST',
        headers: {
          Authorization: kakaoToken,
        },
      }
    );
    const resJson = await res.json();
    const loginToken = resJson.token;
    console.log(loginToken);
    saveLoginToken(loginToken);
    goToMain();
  };

  const saveLoginToken = loginToken => {
    sessionStorage.setItem('loginToken', loginToken);
  };

  const goToMain = () => {
    navigate('/');
  };

  return null;
}

export default KakaoLogin;

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  API_KEY,
  CLIENT_SECRET_KEY,
  JWT_API_URL,
  TOKEN_API_URL,
} from './Oauth';

function KakaoLogin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    getKakaoToken();
  }, []);

  const getKakaoToken = async () => {
    const res = await fetch(TOKEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${API_KEY}&${searchParams}&client_secret=${CLIENT_SECRET_KEY}`,
    });
    const resJson = await res.json();
    const accessToken = resJson.access_token;
    getLoginToken(accessToken);
  };

  const getLoginToken = async kakaoToken => {
    const res = await fetch(JWT_API_URL, {
      method: 'POST',
      headers: {
        Authorization: kakaoToken,
      },
    });
    const resJson = await res.json();
    const loginToken = resJson.token;
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

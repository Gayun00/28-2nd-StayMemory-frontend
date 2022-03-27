import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { JWT_TOKEN_URL, TOKEN_API_URL } from 'utils/constants/constants';
import { loginTokenState } from 'utils/GlobalState';
function KakaoLogin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loginToken, setLoginToken] = useRecoilState(loginTokenState);
  const API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  useEffect(() => {
    getKakaoToken();
  }, []);

  const getKakaoToken = () => {
    fetch(TOKEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${API_KEY}&${searchParams}&client_secret=${CLIENT_SECRET}`,
    })
      .then(res => res.json())
      .then(res => getLoginToken(res.access_token))
      .catch(err => console.error(err));
  };

  const getLoginToken = kakaoToken => {
    fetch(JWT_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: kakaoToken,
      },
    })
      .then(res => res.json())
      .then(res => setLoginToken(res.token))
      .catch(err => console.error(err));
    goToMain();
  };

  const goToMain = () => {
    navigate('/');
  };

  return null;
}

export default KakaoLogin;

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginTokenState } from '../../utils/GlobalState';
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
    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${API_KEY}&${searchParams}&client_secret=${CLIENT_SECRET}`,
    })
      .then(res => res.json())
      .then(res => getLoginToken(res.access_token));
  };

  const getLoginToken = kakaoToken => {
    fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/users/signin-kakao`,
      {
        method: 'POST',
        headers: {
          Authorization: kakaoToken,
        },
      }
    )
      .then(res => res.json())
      .then(res => setLoginToken(res.token));
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

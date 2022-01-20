import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
function KakaoLogin() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState();
  // const API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const API_KEY = '61d21cb7cc0fa85b881660e01f84c54b';
  const CLIENT_SECRET = '8WF6yOVTDxc36khE3GHGZNB9Oc1otlk2';
  const navigate = useNavigate();
  console.log(
    `grant_type=authorization_code&client_id=${API_KEY}&${searchParams}&client_secret=${CLIENT_SECRET}`
  );
  // const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  useEffect(() => {
    console.log(searchParams);
  }, []);
  useEffect(() => {
    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${API_KEY}&${searchParams}&client_secret=${CLIENT_SECRET}`,
    })
      .then(res => res.json())
      .then(res => setToken(res.access_token));
    console.log(token);
    sessionStorage.setItem('token', token);
  }, [searchParams]);

  useEffect(() => {
    fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/users/signin-kakao`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
        },
      }
    )
      .then(res => res.json())
      .then(res => console.log(res));
    navigate('/');
  }, [token]);
  // console.log(searchParams.get('code'));
  return null;
}

export default KakaoLogin;

import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
function KakaoLogin() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  useEffect(() => {
    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${API_KEY}&${searchParams}&client_secret=${CLIENT_SECRET}`,
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }, [searchParams]);
  // console.log(searchParams.get('code'));
  return null;
}

export default KakaoLogin;

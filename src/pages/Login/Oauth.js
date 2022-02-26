export const API_KEY = process.env.REACT_APP_API_KEY;
export const CLIENT_SECRET_KEY = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/signin_kakao';

export const KAKAO_AUTH_PAGE_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_SECRET_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const TOKEN_API_URL = 'https://kauth.kakao.com/oauth/token';
export const JWT_API_URL =
  'http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/users/signin-kakao';

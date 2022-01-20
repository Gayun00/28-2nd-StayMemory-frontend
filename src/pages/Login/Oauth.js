const CLIENT_ID = '716e13ab98b82ef5aa0647ed84980d87';
const REDIRECT_URI = 'http://localhost:3000/users/signin-kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

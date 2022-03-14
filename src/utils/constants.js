export const BASE_URL =
  'http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/';
export const API_KEY = process.env.REACT_APP_API_KEY;
export const CLIENT_SECRET_KEY = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/signin_kakao';
export const TOKEN_API_URL = 'https://kauth.kakao.com/oauth/token';
export const KAKAO_AUTH_PAGE_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_SECRET_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const FETCH_LiST_API_URL = query => {
  return `${BASE_URL}stays${query && query}`;
};

export const TYPE_DATA = {
  count: [
    { id: 1, type: '성인', name: 'adult' },
    { id: 2, type: '아동', age: '24개월~12세', name: 'child' },
    { id: 3, type: '영아', age: '24개월 미만', name: 'baby' },
  ],
  category: [
    { id: 1, type: '게스트하우스', name: '게스트하우스' },
    { id: 2, type: '호텔', name: '호텔' },
  ],
  theme: [
    { id: 1, type: '디자인투어', name: 'designTour' },
    {
      id: 2,
      type: '풀빌라',
      name: 'pool',
    },
    {
      id: 3,
      type: '정적인휴식',
      name: 'rest',
    },
  ],
};

export const cities = [
  { id: 0, type: '전체', name: '전체' },
  { id: 1, type: '서울특별시', name: '서울' },
  { id: 2, type: '제주특별자치도', name: '제주' },
  { id: 3, type: '강원도', name: '강원' },
];

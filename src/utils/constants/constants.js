export const BASE_URL =
  'http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com';

export const RESERVATION_URL = `${BASE_URL}/reservations`;
export const WISHLIST_URL = `${BASE_URL}/wishlists`;
const LOAD_HOTEL_URL = `${BASE_URL}/stays`;

export const FETCH_LiST_API_URL = query => {
  return `${BASE_URL}/stays${query && query}`;
};
export const UNAVAILABLE_DATES_URL = (stayId, startDate) =>
  `${LOAD_HOTEL_URL}/${stayId}/unavailable-date?start-date=${startDate}`;
export const ADMIN_URL = (adminId, stayId) => {
  return `${BASE_URL}/admins/${adminId}${stayId && `?stay-id=${stayId}`}`;
};
export const GET_TOTAL_PRICE_URL = (
  paramsId,
  checkinDate,
  checkoutDate,
  peopleCount
) => {
  return `${LOAD_HOTEL_URL}/${paramsId}/price?start-date=${checkinDate}&end-date=${checkoutDate}&num-people=${peopleCount}`;
};

export const API_KEY = process.env.REACT_APP_API_KEY;
export const CLIENT_SECRET_KEY = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/signin_kakao';
export const TOKEN_API_URL = 'https://kauth.kakao.com/oauth/token';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const KAKAO_AUTH_PAGE_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_SECRET_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const JWT_TOKEN_URL = `${BASE_URL}/users/signin-kakao`;

export const TYPE_DATA = {
  count: [
    { id: 1, type: '성인', name: 'adult' },
    { id: 2, type: '아동', age: '24개월~12세', name: 'child' },
    { id: 3, type: '영아', age: '24개월 미만', name: 'baby' },
  ],
  category: [
    { id: 1, type: '게스트하우스', name: 'guesthouse' },
    { id: 2, type: '호텔', name: 'hotel' },
  ],
  theme: [
    { id: 1, type: '디자인투어', name: 'designtour' },
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
  cities: [
    { id: 0, type: 'all', name: '전체' },
    { id: 1, type: 'seoul', name: '서울' },
    { id: 2, type: 'jeju', name: '제주' },
    { id: 3, type: 'busan', name: '부산' },
  ],
  categories: [
    {
      id: 0,
      name: '예약정보',
      category: 'reservation',
    },
    {
      id: 1,
      name: '다녀온 스테이',
      category: 'history',
    },
  ],
};

export const checkin = 'checkin';
export const checkout = 'checkout';
export const dates = 'dates';
export const city = 'city';
export const jeju = 'jeju';
export const seoul = 'seoul';
export const busan = 'busan';
export const guesthouse = 'guesthouse';
export const hotel = 'hotel';
export const 제주특별자치도 = '제주특별자치도';
export const 서울특별시 = '서울특별시';
export const 부산광역시 = '부산광역시';
export const 게스트하우스 = '게스트하우스';
export const 호텔 = '호텔';

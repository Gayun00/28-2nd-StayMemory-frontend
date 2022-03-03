import { atom } from 'recoil';

export const filterConditionState = atom({
  key: 'filterConditionState',
  default: {
    city: '',
    count: {
      adult: 0,
      child: 0,
      baby: 0,
    },
    priceRange: {
      min: 0,
      max: 0,
    },
    category: [],
    theme: [],
  },
});

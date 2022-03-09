import { atom } from 'recoil';

export const showModalState = atom({
  key: 'showModalState',
  default: null,
});

export const isModalOpenedState = atom({
  key: 'isModalOpenedState',
  default: false,
});

export const selectedDatesState = atom({
  key: 'selectedDatesState',
  default: {
    checkin: null,
    checkout: null,
  },
});

export const validDatesState = atom({
  key: 'validDatesState',
  default: false,
});

export const selectedLocationState = atom({
  key: 'selectedLocationState',
  default: {
    city: null,
  },
});

export const disabledDatesState = atom({
  key: 'disabledDatesState',
  default: [],
});

export const totalPriceState = atom({
  key: 'totalPriceState',
  default: 0,
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export const selectedHotelIdState = atom({
  key: 'selectedHotelIdState',
  default: 0,
});

export default showModalState;

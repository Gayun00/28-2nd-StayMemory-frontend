import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  GET_TOTAL_PRICE_URL,
  RESERVATION_URL,
} from 'utils/constants/constants';
import { loginTokenState } from 'utils/GlobalState';
import { useError } from 'utils/hooks/useError';

function ReservationButton({ startDate, endDate }) {
  const checkinDate = startDate && startDate.format('YYYY-MM-DD');
  const checkoutDate = endDate && endDate.format('YYYY-MM-DD');
  const PEOPLE_COUNT = 2;
  const [totalPrice, setTotalPrice] = useState('');
  const LOGIN_TOKEN = useRecoilValue(loginTokenState);
  const stayId = useParams().id;
  const { throwError, catchError } = useError();

  async function getTotalPrice() {
    try {
      const res = await fetch(
        GET_TOTAL_PRICE_URL(stayId, checkinDate, checkoutDate, PEOPLE_COUNT)
      );
      const resJson = await res.json();
      const price = resJson.data.total_price;
      setTotalPrice(price);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    endDate && getTotalPrice();
  }, [endDate]);

  const bookHotel = async () => {
    try {
      const res = await fetch(RESERVATION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: LOGIN_TOKEN,
        },
        body: JSON.stringify({
          stayId: stayId,
          numPeople: 2,
          checkin: checkinDate,
          checkout: checkoutDate,
          price: totalPrice,
          payment: 'credit_card',
        }),
      });
      const resJson = await res.json();
      if (!res.ok) {
        throwError(resJson);
      }
    } catch (err) {
      catchError(err);
    }
  };

  return (
    <BookButton onClick={bookHotel}>
      <button>{totalPrice ? `${totalPrice}원  ` : ''}결제하기</button>
    </BookButton>
  );
}

const BookButton = styled.div`
  & > button {
    width: 14rem;
    height: 2.5rem;
    background-color: black;
    border: none;
    color: white;
  }
`;

export default ReservationButton;

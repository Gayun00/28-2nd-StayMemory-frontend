import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GET_TOTAL_PRICE_URL, RESERVATION_URL } from '../../../utils/constants';

function ReservationButton({ startDate, endDate }) {
  const checkinDate = startDate && startDate.format('YYYY-MM-DD');
  const checkoutDate = endDate && endDate.format('YYYY-MM-DD');
  const peopleCount = 2;
  const [totalPrice, setTotalPrice] = useState('');
  const LOGIN_TOKEN = sessionStorage.getItem('loginToken');
  const paramsId = useParams().id;

  async function getTotalPrice() {
    const res = await fetch(
      GET_TOTAL_PRICE_URL(paramsId, checkinDate, checkoutDate, peopleCount)
    );
    const resJson = await res.json();
    const price = resJson.data.total_price;
    setTotalPrice(price);
  }

  useEffect(() => {
    endDate && getTotalPrice();
  }, [endDate]);

  async function bookHotel() {
    try {
      await fetch(RESERVATION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: LOGIN_TOKEN,
        },
        body: JSON.stringify({
          stayId: paramsId,
          numPeople: 2,
          checkin: checkinDate,
          checkout: checkoutDate,
          price: totalPrice,
          payment: 'credit_card',
        }),
      });
    } catch (err) {
      console.error(err);
    }
  }

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

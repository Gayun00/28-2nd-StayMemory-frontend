import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function ReservationButton({ startDate, endDate }) {
  const checkinDate = startDate && startDate.format('YYYY-MM-DD');
  const checkoutDate = endDate && endDate.format('YYYY-MM-DD');
  const peopleCount = 2;
  const [totalPrice, setTotalPrice] = useState('');
  const LOGIN_TOKEN = sessionStorage.getItem('loginToken');
  const paramsId = useParams().id;
  console.log(paramsId);

  console.log(checkinDate, checkoutDate);

  async function getTotalPrice() {
    const res = await fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/stays/2/price?start-date=${checkinDate}&end-date=${checkoutDate}&num-people=${peopleCount}`
    );
    const resJson = await res.json();
    const price = resJson.data.total_price;
    setTotalPrice(price);
  }

  useEffect(() => {
    endDate && getTotalPrice();
  }, [endDate]);

  function bookHotel(hotel) {
    alert('예약되었습니다.');

    fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/reservations`,
      {
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
      }
    )
      .then(res => res.json())
      .then(res => console.log(res));
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

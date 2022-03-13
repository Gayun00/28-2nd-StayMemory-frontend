import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function ReservationButton({ startDate, endDate }) {
  const checkinDate = startDate && startDate.format('YYYY-MM-DD');
  const checkoutDate = endDate && endDate.format('YYYY-MM-DD');
  const peopleCount = 2;
  const [totalPrice, setTotalPrice] = useState('');
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
    getTotalPrice();
  }, [endDate]);

  // function bookHotel(hotel) {
  //   alert('예약되었습니다.');
  //   const test = {
  //     stayId: hotel.hotelId,
  //     numPeople: 2,
  //     checkin: checkinDate,
  //     checkout: checkoutDate,
  //     price: totalPrice,
  //     payment: 'credit_card',
  //   };

  //   fetch(
  //     `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/reservations`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: LOGIN_TOKEN,
  //       },
  //       body: JSON.stringify({
  //         stayId: 1,
  //         numPeople: 2,
  //         checkin: '2021-02-21',
  //         checkout: '2021-02-22',
  //         price: totalPrice,
  //         payment: 'credit_card',
  //       }),
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(res => console.log(res));
  // }

  return (
    <BookButton>
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

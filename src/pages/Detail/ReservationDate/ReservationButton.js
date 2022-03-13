import React from 'react';
import styled from 'styled-components';

function ReservationButton() {
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

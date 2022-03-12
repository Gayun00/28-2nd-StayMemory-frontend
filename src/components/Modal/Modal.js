import * as React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import showModalState, {
  selectedDatesState,
  selectedHotelIdState,
  // selectedLocationState,
  totalPriceState,
  // validDatesState,
} from './GlobalState';
import { GrClose } from 'react-icons/gr';

export default function Modal({ children, onClose }) {
  const selectedDates = useRecoilValue(selectedDatesState);
  const selectedHotelId = useRecoilValue(selectedHotelIdState);
  const setTotalPrice = useSetRecoilState(totalPriceState);

  function submitSelectedDates() {
    fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/stays/${selectedHotelId}/price?start-date=${selectedDates.checkin}&end-date=${selectedDates.checkout}&num-people=2`
    )
      .then(res => res.json())
      .then(res => setTotalPrice(res.data.total_price));
  }

  return (
    <Background>
      <ModalContainer>
        <GrClose onClick={onClose} />
        {children}
      </ModalContainer>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background-color: rgb(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  padding: 30px;
  background-color: white;
  border-radius: 20px;

  & > svg {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

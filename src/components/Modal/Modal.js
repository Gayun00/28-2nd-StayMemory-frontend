import * as React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import showModalState, {
  selectedDatesState,
  selectedHotelIdState,
  selectedLocationState,
  totalPriceState,
  validDatesState,
} from './GlobalState';
import SelectDate from './ModalContent/SelectDate';
import SelectCity from './ModalContent/SelectCity';

export default function Modal({ clickRef, onToggle, content }) {
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const selectedDates = useRecoilValue(selectedDatesState);
  const selectedHotelId = useRecoilValue(selectedHotelIdState);
  const selectedLocation = useRecoilValue(selectedLocationState);
  const validDates = useRecoilValue(validDatesState);
  const [buttonIsValid, setButtonIsValid] = React.useState(false);
  const setTotalPrice = useSetRecoilState(totalPriceState);

  function submitSelectedDates() {
    fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/stays/${selectedHotelId}/price?start-date=${selectedDates.checkin}&end-date=${selectedDates.checkout}&num-people=2`
    )
      .then(res => res.json())
      .then(res => setTotalPrice(res.data.total_price));
  }

  const modalContentObj = {
    date: <SelectDate content={content} onToggle={onToggle} />,
    location: <SelectCity content={content} onToggle={onToggle} />,
  };

  React.useEffect(() => {
    function disableButton() {
      if (showModal === 'location') {
        setButtonIsValid(selectedLocation.location !== null);
      } else if (showModal === 'date' || showModal === 'date_detail') {
        setButtonIsValid(validDates);
      }
    }
    disableButton();
  }, [selectedLocation, validDates, selectedDates, showModal, buttonIsValid]);

  return <Wrapper ref={clickRef}>{modalContentObj[content]}</Wrapper>;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

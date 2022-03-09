import * as React from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import showModalState, {
  selectedDatesState,
  selectedHotelIdState,
  selectedLocationState,
  totalPriceState,
  validDatesState,
} from './GlobalState';
import Location from './ModalContentItem/Location/Location';
import SelectDate from './ModalContent/SelectDate';
import SelectCity from './ModalContent/SelectCity';

import convertToQs from '../../utils/hooks/useQueryStringArr';
import { useNavigate } from 'react-router';
import CalendarM from './ModalContentItem/Calendar/CalendarM';
import useClickAway from '../../utils/hooks/useClickAway';

export default function Modal({ form, onToggle, content }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const selectedDates = useRecoilValue(selectedDatesState);
  const selectedHotelId = useRecoilValue(selectedHotelIdState);
  const selectedLocation = useRecoilValue(selectedLocationState);
  const validDates = useRecoilValue(validDatesState);
  const [buttonIsValid, setButtonIsValid] = React.useState(false);
  const setTotalPrice = useSetRecoilState(totalPriceState);
  const { clickRef, isOpened, onToggled } = useClickAway();
  console.log(content);

  function submitSelectedDates() {
    fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/stays/${selectedHotelId}/price?start-date=${selectedDates.checkin}&end-date=${selectedDates.checkout}&num-people=2`
    )
      .then(res => res.json())
      .then(res => setTotalPrice(res.data.total_price));
  }

  const modalContentObj = {
    date: <SelectDate content={content} />,
    location: <SelectCity content={content} />,
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

  function onClose() {
    setShowModal(null);
  }

  return <Wrapper>{modalContentObj[content]}</Wrapper>;
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

// const SearchButton = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 8rem;
//   height: 2.5rem;
//   margin: 1.5rem 0 0.5rem 0;
//   background: ${props => (props.validDates ? 'black' : 'lightgrey')};
//   border: none;
//   border-radius: 1.5rem;
//   color: white;
//   cursor: ${props => (props.validDates ? 'pointer' : 'none')};
// `;

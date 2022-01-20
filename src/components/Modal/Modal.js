import * as React from 'react';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import showModalState, {
  disabledDatesState,
  selectedDatesState,
  selectedLocationState,
  validDatesState,
} from './GlobalState';
import Location from '../Modal/Location/Location';
import SelectDate from './SelectDate/SelectDate';
import { useEffect } from 'react/cjs/react.development';
import convertToQs from '../QueryString/QueryString';
import { useNavigate } from 'react-router';

export default function StaticDateRangePickerDemo() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const selectedDates = useRecoilValue(selectedDatesState);
  const selectedLocation = useRecoilValue(selectedLocationState);
  const setDisabledDates = useSetRecoilState(disabledDatesState);
  const validDates = useRecoilValue(validDatesState);
  const [buttonIsValid, setButtonIsValid] = React.useState(false);

  function onClickSearch() {
    setShowModal(null);
    if (showModal === 'location') {
      navigate(convertToQs('list', selectedLocation));
    } else if (showModal === 'date') {
      navigate(convertToQs('list', selectedDates));
    } else if (showModal === 'date_detail') {
      getUnavaliableDate();
      console.log('dd');
    }
  }

  function getUnavaliableDate() {
    fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/stays/2/price?start-date=2022-01-01&end-date=2022-01-03&num-people=2`
    );
    // .then(res => res.json())
    // .then(res => setDisabledDates(res));
  }

  useEffect(() => {
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

  const modalTitle = {
    location: '어디로 떠날까요?',
    date: '언제 떠날까요?',
    date_detail: '예약 날짜를 선택해주세요.',
  };

  const modalButton = {
    location: 'SEARCH',
    date: 'SEARCH',
    date_detail: 'DONE',
  };

  const modalContent = {
    location: <Location />,
    date: <SelectDate />,
    date_detail: <SelectDate detail={true} />,
  };

  return (
    <Wrapper>
      <PopUp>
        <PopUpTitle>
          <h2>{modalTitle[showModal]}</h2>
          <GrClose onClick={onClose} />
        </PopUpTitle>
        <CalendarWrapper>{modalContent[showModal]}</CalendarWrapper>
        <SearchButton
          diabled={!buttonIsValid}
          validDates={validDates}
          onClick={onClickSearch}
        >
          {modalButton[showModal]}
          <BsArrowRight />
        </SearchButton>
      </PopUp>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
`;

const PopUp = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  z-index: 5;
`;

const PopUpTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 1rem 0;
  width: 100%;
  font-size: 1.9rem;

  & > svg {
    color: lightgrey;
    cursor: pointer;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 2.5rem;
  margin: 1.5rem 0 0.5rem 0;
  background: ${props => (props.validDates ? 'black' : 'lightgrey')};
  border: none;
  border-radius: 1.5rem;
  color: white;
  cursor: ${props => (props.validDates ? 'pointer' : 'none')};
`;

const CalendarWrapper = styled.div`
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
`;

import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import CalendarS from '../../../components/Modal/ModalContentItem/Calendar/CalendarS';
import styled from 'styled-components';
import moment from 'moment';

function ReservationDate({startDate, endDate}) {
  const [isOpened, setIsOpened] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [diffDays, setDiffDays] = useState(0);

  function toggleCalendar() {
    setIsOpened(!isOpened);
  }

  function onClickSelectDate() {
    toggleCalendar();
    setFocusedInput('startDate');
  }

  function handleDatesChange({ startDate, endDate }) {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  useEffect(() => {
    if (startDate && endDate) {
      const diffDays = moment(endDate).diff(moment(startDate), 'days');
      setDiffDays(diffDays);
    }
  }, [startDate, endDate]);

  return (
    <>
      <div onClick={onClickSelectDate}>
        {startDate && endDate ? (
          `${startDate.format('YYYY.MM.DD')}~${endDate.format('YYYY.MM.DD')}${
            diffDays && `/${diffDays}박`
          }`
        ) : (
          <p>날짜를 선택해주세요</p>
        )}
      </div>
      <IoIosArrowDown />
      {isOpened && (
        <CalenderContainer>
          <CalendarS
            startDate={startDate}
            endDate={endDate}
            handleDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            setFocusedInput={setFocusedInput}
          />
        </CalenderContainer>
      )}
    </>
  );
}

const CalenderContainer = styled.div`
  //
`;

export default ReservationDate;

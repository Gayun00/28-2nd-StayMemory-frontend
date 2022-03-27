import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import CalendarS from 'components/Modal/ModalContentItem/Calendar/CalendarS';
import styled from 'styled-components';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { UNAVAILABLE_DATES_URL } from 'utils/constants/constants';

function ReservationDate({ startDate, endDate, setStartDate, setEndDate }) {
  const [isOpened, setIsOpened] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [diffDays, setDiffDays] = useState(0);
  const today = moment().format('YYYY-MM-DD');
  const stayIdParams = useParams().id;
  const [unAvailableDates, setUnavailableDates] = useState([]);

  async function getUnavaliableDate() {
    try {
      const res = await fetch(UNAVAILABLE_DATES_URL(stayIdParams, today));
      const resJson = await res.json();
      const undates = resJson.data.date.sort();
      setUnavailableDates(undates);
    } catch (err) {
      console.error(err);
    }
  }

  function toggleCalendar() {
    setIsOpened(!isOpened);
  }

  function onClickSelectDate() {
    toggleCalendar();
    setFocusedInput('startDate');
    getUnavaliableDate();
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
  function disableDates(momentDate) {
    const date = momentDate.format('YYYY-MM-DD');
    if (focusedInput === 'startDate') {
      return unAvailableDates.includes(date) ? true : false;
    } else if (focusedInput === 'endDate') {
      if (checkFirstUnAvailableDates()) {
        return unAvailableDates.includes(date) ||
          moment(date).isAfter(checkFirstUnAvailableDates())
          ? true
          : false;
      }
    }
  }
  function checkFirstUnAvailableDates() {
    for (let i = 0; i < unAvailableDates.length; i++) {
      if (moment(unAvailableDates[i]).isAfter(startDate)) {
        return unAvailableDates[i];
      }
    }
  }

  return (
    <Wrapper>
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
        <div>
          <CalendarS
            startDate={startDate}
            endDate={endDate}
            handleDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            setFocusedInput={setFocusedInput}
            isDayBlocked={disableDates}
          />
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-right: 20px;
`;

export default ReservationDate;

import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import CalendarS from '../../../components/Modal/ModalContentItem/Calendar/CalendarS';
import styled from 'styled-components';
import moment from 'moment';
import { useParams, useSearchParams } from 'react-router-dom';

function ReservationDate({ startDate, endDate, setStartDate, setEndDate }) {
  const [isOpened, setIsOpened] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [diffDays, setDiffDays] = useState(0);
  const today = moment().format('YYYY-MM-DD');
  const stayIdParams = useParams().id;
  const [unAvaliableDates, setUnavailableDates] = useState([
    '2022-03-14',

    '2022-03-19',
    '2022-03-22',
  ]);

  async function getUnavaliableDate() {
    const res = await fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/stays/${stayIdParams}/unavailable-date?start-date=${today}`
    );
    const resJson = await res.json();
    const unAvailableDates = resJson.data.date;
    // setUnavailableDates(unAvailableDates);
  }
  getUnavaliableDate();
  // console.log(disabledDates);

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

  function disableDates(momentDate) {
    const date = momentDate.format('YYYY-MM-DD');
    if (focusedInput === 'startDate') {
      return unAvaliableDates.includes(date) ? true : false;
    } else if (focusedInput === 'endDate') {
      console.log(checkFirstUnAvailableDates());
      return unAvaliableDates.includes(date) ||
        moment(date).isBefore(startDate.format('YYYY-MM-DD')) ||
        moment(date).isAfter(checkFirstUnAvailableDates())
        ? true
        : false;
    }
  }
  function checkFirstUnAvailableDates() {
    for (let i = 0; i < unAvaliableDates.length; i++) {
      if (moment(unAvaliableDates[i]).isAfter(startDate)) {
        return unAvaliableDates[i];
      }
    }
  }

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
            isDayBlocked={disableDates}
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

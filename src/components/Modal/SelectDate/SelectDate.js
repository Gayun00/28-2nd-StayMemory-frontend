import React, { useState } from 'react';
import Calendar from 'react-date-range-calendar';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  disabledDatesState,
  selectedDatesState,
  validDatesState,
} from '../GlobalState';
import moment from 'moment';

function SelectDate() {
  const [selectedDates, setSelectedDates] = useRecoilState(selectedDatesState);
  const [validDates, setValidDates] = useRecoilState(validDatesState);
  const disabledDatesArr = [];
  // const [isAfterSixMonth, setIsAfterSixMonth] = useState(false);
  const disabledDates = useRecoilValue(disabledDatesState);

  disabledDates.forEach(date => disabledDatesArr.push(date));
  console.log(disabledDatesArr);
  function validDate(dates) {
    disabledDatesArr.some(disabledDate => !dates.includes(disabledDate))
      ? setValidDates(true)
      : setValidDates(false);
  }

  const selectedDatesIsNotValid =
    selectedDates.checkout !== null && validDates === false;

  function getDisabledDates() {
    //
  }

  function handleReservation() {
    //
  }

  // function handleAfterSixMonth() {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = currentDate.getMonth() + 1;
  //   const day = currentDate.getDate();
  //   const fullDate = `${year}-${month}-${day}`;

  //   const date = moment(fullDate);
  //   const selectedDate = moment(selectedDates.checkin);
  //   const monthBetween = moment.duration(selectedDate.diff(date)).asMonths();
  //   console.log(monthBetween > 6);
  //   setValidDates(monthBetween > 6);
  //   // setIsAfterSixMonth(monthBetween > 6);
  //   return monthBetween > 6;
  // }
  // handleAfterSixMonth();
  // var a = moment([2007, 0, 29]);
  // var b = moment([2007, 0, 28]);
  // console.log(a, a.diff(b, 'days'));
  return (
    <Wrapper>
      <Notice>
        {selectedDatesIsNotValid ? '예약 불가능한 날짜가 포함되었습니다.' : ''}
        {/* {isAfterSixMonth ? '6개월 내의 날짜만 예약가능합니다.' : ''} */}
      </Notice>
      {disabledDatesArr.length && (
        <Calendar
          onSelect={(startDate, endDate, validDateRange) => {
            validDate(validDateRange);
            setSelectedDates({
              ...selectedDates,
              checkin: startDate,
              checkout: endDate,
            });
          }}
          selectedRange={[null, null]}
          disablePrevDates={true}
          disabledDates={() => {
            return disabledDatesArr;
          }}
          startDateTdCssObj={{
            backgroundColor: 'black',
            borderRadius: '1rem 0 0 0',
          }}
          endDateTdCssObj={{
            backgroundColor: 'black',
            borderRadius: '0 0 1rem 0',
          }}
          inRangedTdCssObj={{ backgroundColor: 'black' }}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
`;

const Notice = styled.p`
  height: 1rem;
  color: red;
`;

export default SelectDate;

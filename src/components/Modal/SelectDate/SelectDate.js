import React from 'react';
import Calendar from 'react-date-range-calendar';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import showModalState, {
  disabledDatesState,
  selectedDatesState,
  validDatesState,
} from '../GlobalState';

function SelectDate() {
  const [selectedDates, setSelectedDates] = useRecoilState(selectedDatesState);
  const [validDates, setValidDates] = useRecoilState(validDatesState);
  const disabledDatesArr = [];
  const modal = useRecoilValue(showModalState);
  const disabledDates = useRecoilValue(disabledDatesState);

  disabledDates.forEach(date => disabledDatesArr.push(date));
  function validDate(dates) {
    disabledDatesArr.some(disabledDate => !dates.includes(disabledDate))
      ? setValidDates(true)
      : setValidDates(false);
  }

  const selectedDatesIsNotValid =
    selectedDatesState.length &&
    selectedDates.check_out !== null &&
    validDates === false;

  return (
    <Wrapper>
      <Notice>
        {selectedDatesIsNotValid ? '예약 불가능한 날짜가 포함되었습니다.' : ''}
      </Notice>
      {(modal === 'date' || disabledDatesArr.length) && (
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

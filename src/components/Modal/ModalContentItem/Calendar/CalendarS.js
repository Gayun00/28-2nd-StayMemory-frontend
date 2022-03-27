import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import styled from 'styled-components';

function CalendarS({
  startDate,
  endDate,
  handleDatesChange,
  focusedInput,
  setFocusedInput,
  isDayBlocked,
}) {
  return (
    <CalendarContainer>
      <DateRangePicker
        startDatePlaceholderText="체크인"
        endDatePlaceholderText="체크아웃"
        startDateAriaLabel="체크인"
        endDateAriaLabel="체크아웃"
        startDateTitleText="체크인"
        endDateTitleText="체크아웃"
        startDate={startDate}
        startDateId="start-date"
        endDate={endDate}
        endDateId="end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        noBorder={true}
        small={true}
        isDayBlocked={isDayBlocked}
      />
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  position: absolute;
  .DateInput {
    display: none;
  }
`;

export default CalendarS;

import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function CalendarS({
  startDate,
  endDate,
  handleDatesChange,
  focusedInput,
  setFocusedInput,
}) {
  return (
    <div className="App">
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
        onFocusChange={focusedInput => console.log(focusedInput)}
        noBorder={true}
        small={true}
        // customArrowIcon={null}
      />
    </div>
  );
}

export default CalendarS;

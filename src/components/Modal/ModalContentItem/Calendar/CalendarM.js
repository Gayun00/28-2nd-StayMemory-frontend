import React, { useEffect, useState } from 'react';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import styled from 'styled-components';
import SearchButton from '../../../Button/SearchButton';

function CalendarM() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [initialMonth, setInitialMonth] = useState(moment('01-01-2021'));

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(moment(startDate, 'MMM DD, YYYY'));
    setEndDate(moment(endDate, 'MMM DD, YYYY'));
  };

  const handleFocusedInput = ({ focusedInput }) => {
    console.log(focusedInput, 'lkk');
    setFocusedInput(focusedInput);
  };

  // useEffect(() => {
  //   console.log(startDate, focusedInput);
  // }, [startDate, focusedInput]);
  return (
    <div>
      <DayPickerRangeController
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        numberOfMonths={2}
        initialVisibleMonth={() => initialMonth}
        noBorder={true}
        small={true}
        // customArrowIcon={null}
      />
    </div>
  );
}
export default CalendarM;

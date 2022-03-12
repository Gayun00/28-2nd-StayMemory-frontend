import React, { useEffect, useState } from 'react';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import styled from 'styled-components';
import SearchButton from '../../../Button/SearchButton';
import { useRecoilState } from 'recoil';
import { selectedDatesState } from '../../GlobalState';

function CalendarM({ selectedDates, setSelectedDates }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState('startDate');
  const [initialMonth, setInitialMonth] = useState(moment());
  // const [selectedDates, setSelectedDates] = useRecoilState(selectedDatesState);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(moment(startDate));
    setEndDate(moment(endDate));
  };

  useEffect(() => {
    setSelectedDates({
      ...selectedDates,
      checkin: startDate.format('YYYY-MM-DD').toString(),
      checkout: endDate.format('YYYY-MM-DD').toString(),
    });
  }, [focusedInput]);

  return (
    <div>
      <DayPickerRangeController
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        startDate={moment(startDate)}
        endDate={moment(endDate)}
        numberOfMonths={2}
        initialVisibleMonth={() => initialMonth}
      />
    </div>
  );
}
export default CalendarM;

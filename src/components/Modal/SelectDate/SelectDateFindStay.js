// import DatePicker from "./date-picker";
import React, { useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { useRecoilState } from 'recoil';
import { selectedDatesState } from '../GlobalState';

function SelectDateFindStay() {
  const [selectedDates, setSelectedDates] = useRecoilState(selectedDatesState);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setSelectedDates({
      check_in: startDate,
      check_out: endDate,
    });
  };

  return (
    <div className="App">
      <DateRangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />
    </div>
  );
}

export default SelectDateFindStay;

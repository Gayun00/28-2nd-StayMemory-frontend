import React, { useState } from 'react';
import useQueryString from '../../../utils/hooks/useQueryString';
import CalendarM from '../ModalContentItem/Calendar/CalendarM';
import ModalSelectForm from '../ModalFrame/ModalSelectForm';

function SelectDate({ onClose }) {
  const [selectedDates, setSelectedDates] = useState({
    checkin: '',
    checkout: '',
  });

  const { parseObjectToSearchParams } = useQueryString(selectedDates);

  function onClickSearch() {
    parseObjectToSearchParams();
    onClose();
  }
  return (
    <ModalSelectForm title="언제 떠날까요?" onClickSearch={onClickSearch}>
      <CalendarM
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
    </ModalSelectForm>
  );
}

export default SelectDate;

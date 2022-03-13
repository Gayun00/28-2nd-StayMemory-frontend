import React from 'react';
import { useQueryStringObject } from '../../../utils/hooks/useQueryStringObject';
import CalendarM from '../ModalContentItem/Calendar/CalendarM';
import ModalSelectForm from '../ModalFrame/ModalSelectForm';

function SelectDate({ onClose }) {
  const selectedDates = {
    checkin: '',
    checkout: '',
  };
  const {
    setSelectedListObject,
    selectedListObject,
    parseObjectToSearchParams,
  } = useQueryStringObject(selectedDates);

  function onClickSearch() {
    parseObjectToSearchParams();
    onClose();
  }
  return (
    <ModalSelectForm title="언제 떠날까요?" onClickSearch={onClickSearch}>
      <CalendarM
        selectedDates={selectedListObject}
        setSelectedDates={setSelectedListObject}
      />
    </ModalSelectForm>
  );
}

export default SelectDate;

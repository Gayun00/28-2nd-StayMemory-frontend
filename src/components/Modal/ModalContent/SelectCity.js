import React from 'react';
import CalendarM from '../ModalContentItem/Calendar/CalendarM';
import Location from '../ModalContentItem/Location/Location';
import ModalSelectForm from '../ModalFrame/ModalSelectForm';

function SelectCity() {
  return (
    <ModalSelectForm title="어디로 떠날까요?">
      <Location />
    </ModalSelectForm>
  );
}

export default SelectCity;

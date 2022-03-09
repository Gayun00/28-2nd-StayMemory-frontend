import React from 'react';
import CalendarM from '../ModalContentItem/Calendar/CalendarM';
import ModalSelectForm from '../ModalFrame/ModalSelectForm';

function SelectDate() {
  return (
    <ModalSelectForm title="언제 떠날까요?">
      <CalendarM />
    </ModalSelectForm>
  );
}

export default SelectDate;

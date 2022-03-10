import React, { useState } from 'react';
import useQueryString from '../../../utils/hooks/useQueryString';
import { useQueryStringArr } from '../../../utils/hooks/useQueryStringArr';
import CalendarM from '../ModalContentItem/Calendar/CalendarM';
import Location from '../ModalContentItem/Location/Location';
import ModalSelectForm from '../ModalFrame/ModalSelectForm';

function SelectCity({ onToggle }) {
  const { selectedState, setSelectedState, parseStringToSearchParams } =
    useQueryString('city');

  function onClickSearch() {
    onToggle();
    parseStringToSearchParams();
  }

  return (
    <ModalSelectForm
      title="어디로 떠날까요?"
      onClickSearch={onClickSearch}
      onToggle={onToggle}
    >
      <Location
        selectedCity={selectedState}
        setSelectedCity={setSelectedState}
      />
    </ModalSelectForm>
  );
}

export default SelectCity;

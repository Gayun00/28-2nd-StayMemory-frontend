import React from 'react';
import useQueryString from '../../../utils/hooks/useQueryString';
import Location from '../ModalContentItem/Location/Location';
import ModalSelectForm from '../ModalFrame/ModalSelectForm';

function SelectCity({ onClose }) {
  const { selectedState, setSelectedState, parseStringToSearchParams } =
    useQueryString('city');

  function onClickSearch() {
    onClose();
    parseStringToSearchParams();
  }

  return (
    <ModalSelectForm title="어디로 떠날까요?" onClickSearch={onClickSearch}>
      <Location
        selectedCity={selectedState}
        setSelectedCity={setSelectedState}
      />
    </ModalSelectForm>
  );
}

export default SelectCity;

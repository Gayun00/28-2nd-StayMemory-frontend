import React from 'react';
import { useState } from 'react';
import useQueryString from '../../../utils/hooks/useQueryString';
import useUpdateState from '../../../utils/hooks/useUpdateState';
import Location from '../ModalContentItem/Location/Location';
import ModalSelectForm from '../ModalFrame/ModalSelectForm';

function SelectCity({ onClose }) {
  const [selectedCity, setSelectedCity] = useState({
    city: '',
  });
  const { parseObjectToSearchParams } = useQueryString(selectedCity);
  const { updateState } = useUpdateState(selectedCity, setSelectedCity);

  function onClickSearch() {
    onClose();
    parseObjectToSearchParams();
  }

  return (
    <ModalSelectForm title="어디로 떠날까요?" onClickSearch={onClickSearch}>
      <Location selectedCity={selectedCity} updateCity={updateState} />
    </ModalSelectForm>
  );
}

export default SelectCity;

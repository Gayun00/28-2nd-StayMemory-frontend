import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useQueryStringObject } from '../../../utils/hooks/useQueryStringObject';
import { selectedDatesState } from '../GlobalState';
import CalendarM from '../ModalContentItem/Calendar/CalendarM';
import ModalSelectForm from '../ModalFrame/ModalSelectForm';

function SelectDate({ onToggle }) {
  const [selectedDates, setSelectedDates] = useRecoilState(selectedDatesState);
  const { setSelectedListObject, parseObjectToSearchParams } =
    useQueryStringObject('dates', selectedDates);

  useEffect(() => {
    setSelectedListObject(selectedDates);
  }, [selectedDates]);

  function onClickSearch() {
    parseObjectToSearchParams();
    onToggle();
  }
  return (
    <ModalSelectForm
      onClickSearch={onClickSearch}
      onToggle={onToggle}
      title="언제 떠날까요?"
    >
      <CalendarM />
    </ModalSelectForm>
  );
}

export default SelectDate;

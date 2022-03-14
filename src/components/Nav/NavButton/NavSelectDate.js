import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import ModalPortal from '../../Modal/ModalPortal';
import styled from 'styled-components';
import SelectDate from '../../Modal/ModalContent/SelectDate';
import { AiOutlineCalendar } from 'react-icons/ai';

function NavSelectDate() {
  const [isOpened, setIsOpened] = useState(false);

  function toggleModal() {
    setIsOpened(!isOpened);
  }

  return (
    <>
      <span onClick={toggleModal}>
        <AiOutlineCalendar />
        <FilterButton>언제 떠날까요?</FilterButton>
      </span>
      {isOpened && (
        <ModalPortal>
          <Modal onClose={toggleModal}>
            <SelectDate onClose={toggleModal} />
          </Modal>
        </ModalPortal>
      )}
    </>
  );
}

const FilterButton = styled.span`
  cursor: pointer;
`;

export default NavSelectDate;

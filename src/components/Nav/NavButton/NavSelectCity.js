import React, { useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Modal from '../../Modal/Modal';
import SelectCity from '../../Modal/ModalContent/SelectCity';
import ModalPortal from '../../Modal/ModalPortal';
import styled from 'styled-components';

function NavSelectCity() {
  const [isOpened, setIsOpened] = useState(false);

  function toggleModal() {
    setIsOpened(!isOpened);
  }

  return (
    <>
      <span onClick={toggleModal}>
        <HiOutlineLocationMarker />
        <FilterButton>어디로 떠날까요?</FilterButton>
      </span>
      {isOpened && (
        <ModalPortal>
          <Modal onClose={toggleModal}>
            <SelectCity onClose={toggleModal} />
          </Modal>
        </ModalPortal>
      )}
    </>
  );
}

const FilterButton = styled.span`
  cursor: pointer;
`;

export default NavSelectCity;

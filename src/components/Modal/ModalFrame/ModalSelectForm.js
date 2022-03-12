import React from 'react';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import SearchButton from '../../Button/SearchButton';

function ModalSelectForm({ title, children, onClose, onClickSearch }) {
  return (
    <Wrapper>
      <PopUp>
        <PopUpTitle>
          {/* <GrClose onClick={onClose} /> */}
          <h2>{title}</h2>
        </PopUpTitle>
        <Container>{children}</Container>
        <SearchButton onClickSearch={onClickSearch} />
      </PopUp>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
`;

const Container = styled.div`
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const PopUpTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 1rem 0;
  width: 100%;
  font-size: 1.9rem;

  /* & > svg {
    color: lightgrey;
    cursor: pointer;
  } */
`;

export default ModalSelectForm;

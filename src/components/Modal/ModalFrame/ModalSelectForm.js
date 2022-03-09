import React from 'react';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import SearchButton from '../../Button/SearchButton';

function ModalSelectForm({ title, children }) {
  return (
    <Wrapper>
      <PopUp>
        <PopUpTitle>
          <h2>{title}</h2>
          <GrClose />
        </PopUpTitle>
        <Container>{children}</Container>
        <SearchButton />
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
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: white;
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

  & > svg {
    color: lightgrey;
    cursor: pointer;
  }
`;

export default ModalSelectForm;

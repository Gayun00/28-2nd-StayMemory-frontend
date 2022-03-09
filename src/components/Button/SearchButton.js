import React from 'react';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';

function SearchButton({ onClickSearch, isValid }) {
  return (
    <Wrapper>
      <Button onClick={onClickSearch} isValid={isValid}>
        <p>SEARCH</p>
        <BsArrowRight />
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 2.5rem;
  margin: 1.5rem 0 0.5rem 0;
  background: black;
  border: none;
  border-radius: 1.5rem;
  color: white;
  cursor: pointer;
`;
export default SearchButton;

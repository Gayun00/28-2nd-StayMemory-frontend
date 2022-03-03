import React from 'react';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
import { useQueryString } from '../../utils/QueryString/QueryString';

function SearchButton() {
  function onClickSearch() {}

  return (
    <Button>
      <BsArrowRight />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 2.5rem;
  margin: 1.5rem 0 0.5rem 0;
  background: ${props => (props.validDates ? 'black' : 'lightgrey')};
  border: none;
  border-radius: 1.5rem;
  color: white;
  cursor: ${props => (props.validDates ? 'pointer' : 'none')};
`;
export default SearchButton;

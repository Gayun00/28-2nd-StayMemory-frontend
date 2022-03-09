import React, { useEffect, useState } from 'react';
import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  PeopleTitle,
  ModalBack,
  InputContainer,
  InputHeader,
  InputContent,
  Dash,
  MinRangeBar,
  MaxRangeBar,
  RangeWrap,
} from '../List';
import { AiOutlineClose } from 'react-icons/ai';
import { useQueryStringObject } from '../../../utils/hooks/useQueryStringObject';

export default function SelectPrice({ closeHandler }) {
  const initialState = {
    min: 0,
    max: 0,
  };
  const { addFilterObject, selectedListObject, parseObjectToSearchParams } =
    useQueryStringObject('priceRange', initialState);

  const handleChange = e => {
    const maxPrice = e.target.value * 10000;
    addFilterObject('max', maxPrice);
  };

  return (
    <ModalBack>
      <PeopleTitle>
        가격 범위
        <AiOutlineClose onClick={closeHandler} />
      </PeopleTitle>
      <RangeWrap>
        <MinRangeBar
          onChange={handleChange}
          type="range"
          id="id"
          name="maxprice"
          min="0"
          max="100"
        />
      </RangeWrap>
      <InputContainer>
        <div>
          <InputHeader>최저요금</InputHeader>
          <InputContent>
            <input type="text" value={0} />
            만원
          </InputContent>
        </div>
        <Dash>-</Dash>
        <div>
          <InputHeader>최고요금</InputHeader>
          <InputContent>
            <input type="text" value={selectedListObject.max} />
            만원~
          </InputContent>
        </div>
      </InputContainer>
      <ModalPeopleBtnWrapper>
        <ModalPeopleBtn onClick={() => parseObjectToSearchParams()}>
          적용하기
        </ModalPeopleBtn>
      </ModalPeopleBtnWrapper>
    </ModalBack>
  );
}

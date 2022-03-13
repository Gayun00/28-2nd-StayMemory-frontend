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
  ModalBtn,
} from '../List';
import { AiOutlineClose } from 'react-icons/ai';
import { useQueryStringObject } from '../../../utils/hooks/useQueryStringObject';
import useClickAway from '../../../utils/hooks/useClickAway';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export default function SelectPrice() {
  const initialState = {
    minprice: 0,
    maxprice: 0,
  };
  const { addFilterObject, selectedListObject, parseObjectToSearchParams } =
    useQueryStringObject(initialState);
  const { clickRef, isOpened, onToggle } = useClickAway();

  const handleChange = e => {
    const maxPrice = e.target.value * 10000;
    addFilterObject('maxprice', maxPrice);
  };

  return (
    <div ref={clickRef}>
      <ModalBtn onClick={onToggle}>
        가격 범위
        <MdOutlineKeyboardArrowDown />
      </ModalBtn>
      {isOpened && (
        <ModalBack>
          <PeopleTitle>
            가격 범위
            <AiOutlineClose onClick={onToggle} />
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
      )}
    </div>
  );
}

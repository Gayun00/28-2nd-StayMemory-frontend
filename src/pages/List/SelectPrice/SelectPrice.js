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
import { useRecoilState } from 'recoil';
import { filterConditionState } from '../listState';
import { useQueryString } from '../../../utils/QueryString/QueryString';

export default function SelectPrice({ closeHandler, handleFilter }) {
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);
  const { handleSearchParams } = useQueryString();

  const handleChange = e => {
    const maxPrice = e.target.value * 10000;
    const updatedPriceRange = {
      min: 0,
      max: maxPrice,
    };
    setFilterCondition({
      ...filterCondition,
      priceRange: updatedPriceRange,
    });
  };

  useEffect(() => {
    console.log(filterCondition);
  }, [filterCondition.priceRange]);

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
            <input type="text" value={filterCondition.priceRange.max} />
            만원~
          </InputContent>
        </div>
      </InputContainer>
      <ModalPeopleBtnWrapper>
        <ModalPeopleBtn
          onClick={() => handleSearchParams('priceRange', 'object')}
        >
          적용하기
        </ModalPeopleBtn>
      </ModalPeopleBtnWrapper>
    </ModalBack>
  );
}

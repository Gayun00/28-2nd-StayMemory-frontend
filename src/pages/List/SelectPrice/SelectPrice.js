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

export default function SelectPrice({ closeHandler, handleFilter }) {
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);

  const [value, setValue] = useState(0);

  const handleChange = e => {
    const maxPrice = e.target.value * 10000;
    setValue(maxPrice);
  };

  const onFilter = () => {
    let updateArr = [];

    Object.entries(filterCondition.priceRange).map(([key, value]) => {
      updateArr.push(`${key}=${value}`);
    });
    handleFilter({
      priceRange: updateArr.join('&').toString(),
    });
  };

  useEffect(() => {
    console.log(value, filterCondition.priceRange);
  }, [value, filterCondition]);

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
            <input type="text" value={value} />
            만원~
          </InputContent>
        </div>
      </InputContainer>
      <ModalPeopleBtnWrapper>
        <ModalPeopleBtn onClick={onFilter}>적용하기</ModalPeopleBtn>
      </ModalPeopleBtnWrapper>
    </ModalBack>
  );
}

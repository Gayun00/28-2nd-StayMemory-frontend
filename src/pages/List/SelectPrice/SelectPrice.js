import React, { useState } from 'react';
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
  RangeWrap,
  ModalBtn,
} from 'pages/List/List';
import { AiOutlineClose } from 'react-icons/ai';
import useClickAway from 'utils/hooks/useClickAway';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useUpdateState from 'utils/hooks/useUpdateState';
import useQueryString from 'utils/hooks/useQueryString';

export default function SelectPrice() {
  const [selectedPrice, setSelectedPrice] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const { updateState } = useUpdateState(selectedPrice, setSelectedPrice);
  const { parseObjectToSearchParams } = useQueryString(selectedPrice);

  const { clickRef, isOpened, onToggle } = useClickAway();

  const handleChange = e => {
    const maxPrice = e.target.value * 10000;
    updateState(maxPrice, 'maxPrice');
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
                <input type="text" value={selectedPrice.max} />
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

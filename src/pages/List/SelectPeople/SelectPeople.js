import React from 'react';

import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  InputNum,
  CounterButton,
  PeopleCounter,
  PeopleTitle,
  ModalBack,
  ModalBtn,
} from '../List';
import { AiOutlineClose } from 'react-icons/ai';
import { TYPE_DATA } from '../../../utils/constants';
import { useQueryStringObject } from '../../../utils/hooks/useQueryStringObject';
import useClickAway from '../../../utils/hooks/useClickAway';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
export default function SelectPeople() {
  const initialState = {
    adult: 0,
    child: 0,
    baby: 0,
  };
  const { addFilterObject, selectedListObject, parseObjectToSearchParams } =
    useQueryStringObject(initialState);
  const { clickRef, isOpened, onToggle } = useClickAway();

  const onClickPlusButton = name => {
    console.log(name);
    addFilterObject(name, selectedListObject[name] + 1);
  };

  const onClickMinusButton = name => {
    if (selectedListObject[name]) {
      addFilterObject(name, selectedListObject[name] - 1);
    }
  };

  const onFilter = () => {
    const number = Object.entries(selectedListObject).reduce((acc, curr) => {
      return (acc = acc + curr[1]);
    }, 0);
    const obj = {
      maxpeople: number,
    };
    parseObjectToSearchParams(obj);
  };

  return (
    <div ref={clickRef}>
      <ModalBtn onClick={onToggle}>
        인원
        <MdOutlineKeyboardArrowDown />
      </ModalBtn>
      {isOpened && (
        <ModalBack>
          <PeopleTitle>
            인원
            <AiOutlineClose onClick={onToggle} />
          </PeopleTitle>
          <div>
            {TYPE_DATA.count &&
              TYPE_DATA.count.map((item, idx) => {
                return (
                  <PeopleCounter key={idx}>
                    <span>
                      {item.type}
                      <p>{item.age}</p>
                    </span>
                    <div>
                      <CounterButton
                        onClick={() => onClickMinusButton(item.name)}
                      >
                        -
                      </CounterButton>
                      <InputNum>
                        <input
                          type="number"
                          value={selectedListObject[item.name] || 0}
                          readOnly
                        />
                        <span>명</span>
                      </InputNum>
                      <CounterButton
                        onClick={() => onClickPlusButton(item.name)}
                      >
                        +
                      </CounterButton>
                    </div>
                  </PeopleCounter>
                );
              })}
          </div>
          <ModalPeopleBtnWrapper>
            <ModalPeopleBtn onClick={onFilter}>적용하기</ModalPeopleBtn>
          </ModalPeopleBtnWrapper>
        </ModalBack>
      )}
    </div>
  );
}

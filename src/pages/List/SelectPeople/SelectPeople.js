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
} from 'pages/List/List';
import { AiOutlineClose } from 'react-icons/ai';
import { TYPE_DATA } from 'utils/constants/constants';
import useClickAway from 'utils/hooks/useClickAway';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';
import useUpdateState from 'utils/hooks/useUpdateState';
import useQueryString from 'utils/hooks/useQueryString';
export default function SelectPeople() {
  const [selectedPeople, setSelectedPeople] = useState({
    adult: 0,
    child: 0,
    baby: 0,
  });

  const { updateState } = useUpdateState(selectedPeople, setSelectedPeople);
  const { parseObjectToSearchParams } = useQueryString(selectedPeople);

  const { clickRef, isOpened, onToggle } = useClickAway();

  const onClickPlusButton = name => {
    updateState(selectedPeople[name] + 1, name);
  };

  const onClickMinusButton = name => {
    if (selectedPeople[name]) {
      updateState(selectedPeople[name] - 1, name);
    }
  };

  const onFilter = () => {
    const number = Object.entries(selectedPeople).reduce((acc, curr) => {
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
                          value={selectedPeople[item.name] || 0}
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

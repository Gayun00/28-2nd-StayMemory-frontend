import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  InputNum,
  CounterButton,
  PeopleCounter,
  PeopleTitle,
  ModalBack,
} from '../List';
import { AiOutlineClose } from 'react-icons/ai';
import { TYPE_DATA } from '../../../utils/constants';
import { filterConditionState } from '../listState';
import { useRecoilState } from 'recoil';
import { useQueryString } from '../../../utils/utils';
export default function SelectPeople({ closeHandler, handleFilter }) {
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);
  const initialState = {
    adult: 0,
    child: 0,
    baby: 0,
  };
  const {
    handleSearchParams,
    addFilterObject,
    selectedListObject,
    parseObjectToSearchParams,
  } = useQueryString('count', initialState);

  const plusQuantity = name => {
    const updatedCount = selectedListObject[name] + 1;
    addFilterObject(name, updatedCount);
  };

  const minusQuantity = name => {
    if (selectedListObject[name]) {
      const updatedCount = selectedListObject[name] - 1;
      addFilterObject(name, updatedCount);
    }
  };

  const onFilter = () => {
    parseObjectToSearchParams();
  };

  return (
    <ModalBack>
      <PeopleTitle>
        인원
        <AiOutlineClose onClick={closeHandler} />
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
                  <CounterButton onClick={() => minusQuantity(item.name)}>
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
                  <CounterButton onClick={() => plusQuantity(item.name)}>
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
  );
}

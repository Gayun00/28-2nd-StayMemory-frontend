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
import { useLocation } from 'react-router-dom';
export default function SelectPeople({ closeHandler, handleFilter }) {
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);
  const location = useLocation();

  const headCount = filterCondition.count;

  const plusQuantity = name => {
    const updatedCount = {
      ...filterCondition.count,
      [name]: filterCondition.count[name] + 1,
    };
    setFilterCondition({
      ...filterCondition,
      count: updatedCount,
    });
  };

  const minusQuantity = name => {
    const updatedCount = {
      ...filterCondition.count,
      [name]: filterCondition.count[name] - 1,
    };
    setFilterCondition({
      ...filterCondition,
      count: updatedCount,
    });
  };

  const onFilter = () => {
    let updateArr = [];
    Object.entries(filterCondition.count).map(([key, value]) => {
      updateArr.push(`${key}=${value}`);
    });
    // const URLSearch = new URLSearchParams(location.search);
    handleFilter({
      count: updateArr.join('&').toString(),
    });
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
                      value={filterCondition.count[item.name] || 0}
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

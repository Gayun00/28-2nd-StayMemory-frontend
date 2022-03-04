import React, { useEffect, useState } from 'react';
import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  PeopleTitle,
  ModalBack,
  CheckList,
} from '../List';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { filterConditionState } from '../listState';
import { TYPE_DATA } from '../../../utils/constants';
import { useClickAway, useQueryString } from '../../../utils/utils';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export default function SelectTheme() {
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);
  const { handleArrayToSearchParams } = useQueryString();
  const [category, setCategory] = useState([]);
  const { isOpened, setIsOpened, clickRef } = useClickAway();

  const handleChange = e => {
    let updatedCategory = [];
    const { name } = e.target;
    if (!category.includes(name)) {
      updatedCategory = [...category, name];
    } else {
      updatedCategory = [...category].filter(cate => {
        return cate !== name;
      });
    }
    setCategory(updatedCategory);
  };

  const handleCheckedAll = () => {
    let updateCategory = [];

    if (!isCheckedAll) {
      TYPE_DATA.category.forEach(obj => {
        updateCategory.push(obj.name);
      });
    }

    setFilterCondition({
      ...filterCondition,
      category: updateCategory,
    });
  };

  const isCheckedAll = TYPE_DATA.category.every(obj =>
    category.includes(obj.name)
  );

  return (
    <Wrapper ref={clickRef}>
      <ModalBtn onClick={() => setIsOpened(!isOpened)}>
        스테이 유형
        <MdOutlineKeyboardArrowDown />
      </ModalBtn>
      {isOpened && (
        <ModalBack>
          <PeopleTitle>
            스테이유형
            <AiOutlineClose onClick={() => setIsOpened(!isOpened)} />
          </PeopleTitle>
          <ModalPeopleBtnWrapper>
            <ModalPeopleBtn
              onClick={() => handleArrayToSearchParams('category', category)}
            >
              적용하기
            </ModalPeopleBtn>
          </ModalPeopleBtnWrapper>
          <CheckList>
            <li>
              <label name="all">
                <span>전체</span>
                <input
                  type="checkbox"
                  value="space"
                  name="all"
                  checked={isCheckedAll}
                  onChange={handleCheckedAll}
                />
              </label>
            </li>
            {TYPE_DATA.category.map((item, idx) => {
              return (
                <li key={idx}>
                  <label name={item.name}>
                    <span>{item.type}</span>
                    <input
                      type="checkbox"
                      value="space"
                      name={item.name}
                      checked={category.includes(item.name)}
                      onChange={handleChange}
                    />
                  </label>
                </li>
              );
            })}
          </CheckList>
        </ModalBack>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ModalBtn = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-right: 10px;
  width: 200px;
  line-height: 36px;
  font-size: 14px;
  text-align: left;
  background-color: white;
  cursor: pointer;
  transition: all 1s ease;

  & > svg {
    font-size: 20px;
  }
`;
// 사용자가 선택한 타입 값 관리. > 불리언 데이터 사용

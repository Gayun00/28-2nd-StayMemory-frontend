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
import { useQueryString } from '../../../utils/QueryString/QueryString';

export default function SelectTheme({ closeHandler, handleFilter }) {
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);
  const { handleSearchParams } = useQueryString();

  const handleChange = e => {
    const { name } = e.target;
    let updatedCategory = [];
    if (!filterCondition.category.includes(name)) {
      updatedCategory = [...filterCondition.category, name];
    } else {
      updatedCategory = [...filterCondition.category].filter(cate => {
        return cate !== name;
      });
    }
    setFilterCondition({
      ...filterCondition,
      category: updatedCategory,
    });
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
    filterCondition.category.includes(obj.name)
  );

  return (
    <ModalBack>
      <PeopleTitle>
        스테이유형
        <AiOutlineClose onClick={closeHandler} />
      </PeopleTitle>
      <ModalPeopleBtnWrapper>
        <ModalPeopleBtn onClick={() => handleSearchParams('category', 'array')}>
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
                  checked={filterCondition.category.includes(item.name)}
                  onChange={handleChange}
                />
              </label>
            </li>
          );
        })}
      </CheckList>
    </ModalBack>
  );
}
// 사용자가 선택한 타입 값 관리. > 불리언 데이터 사용

import React from 'react';
import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  PeopleTitle,
  ModalBack,
  CheckList,
} from '../List';
import { AiOutlineClose } from 'react-icons/ai';
import { TYPE_DATA } from '../../../utils/constants';
import { useRecoilState } from 'recoil';
import { filterConditionState } from '../listState';
import { useQueryString } from '../../../utils/QueryString/QueryString';

export default function SelectTheme({ closeHandler }) {
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);
  const { handleSearchParams } = useQueryString();

  const handleChange = e => {
    const { name } = e.target;
    let updatedTheme = [];
    if (!filterCondition.theme.includes(name)) {
      updatedTheme = [...filterCondition.theme, name];
    } else {
      updatedTheme = [...filterCondition.theme].filter(th => {
        return th !== name;
      });
    }

    setFilterCondition({
      ...filterCondition,
      theme: updatedTheme,
    });
  };

  const handleCheckedAll = () => {
    let updateTheme = [];

    if (!isCheckedAll) {
      TYPE_DATA.theme.forEach(obj => {
        updateTheme.push(obj.name);
      });
    }

    setFilterCondition({
      ...filterCondition,
      theme: updateTheme,
    });
  };

  const isCheckedAll = TYPE_DATA.theme.every(obj =>
    filterCondition.theme.includes(obj.name)
  );

  return (
    <ModalBack>
      <PeopleTitle>
        테마
        <AiOutlineClose onClick={closeHandler} />
      </PeopleTitle>
      <ModalPeopleBtnWrapper
        onClick={() => handleSearchParams('theme', 'array')}
      >
        <ModalPeopleBtn>적용하기</ModalPeopleBtn>
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
        {TYPE_DATA.theme.map((obj, idx) => {
          return (
            <li key={idx}>
              <label name={obj.name}>
                <span>{obj.type}</span>
                <input
                  type="checkbox"
                  name={obj.name}
                  checked={filterCondition.theme.includes(obj.name)}
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

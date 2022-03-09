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
import { useQueryStringArr } from '../../../utils/hooks/useQueryStringArr';

export default function SelectTheme({ closeHandler }) {
  const {
    addFilterArr,
    handleCheckedAll,
    isCheckedAll,
    isChecked,
    parseArrayToSearchParams,
  } = useQueryStringArr('theme');

  const handleChange = e => {
    addFilterArr(e);
  };

  return (
    <ModalBack>
      <PeopleTitle>
        테마
        <AiOutlineClose onClick={closeHandler} />
      </PeopleTitle>
      <ModalPeopleBtnWrapper onClick={() => parseArrayToSearchParams()}>
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
                  checked={isChecked(obj.name)}
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

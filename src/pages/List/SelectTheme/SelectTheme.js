import React from 'react';
import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  PeopleTitle,
  ModalBack,
  CheckList,
} from '../List';
import { AiOutlineClose } from 'react-icons/ai';

export default function SelectTheme({ closeHandler }) {
  return (
    <ModalBack>
      <PeopleTitle>
        테마
        <AiOutlineClose onClick={closeHandler} />
      </PeopleTitle>
      <ModalPeopleBtnWrapper>
        <ModalPeopleBtn>적용하기</ModalPeopleBtn>
      </ModalPeopleBtnWrapper>
      <CheckList>
        <li>
          <label>
            <span>디자인투어</span>
            <input type="checkbox" />
          </label>
        </li>
        <li>
          <label>
            <span>사색</span>
            <input type="checkbox" />
          </label>
        </li>
        <li>
          <label>
            <span>도심속휴식</span>
            <input type="checkbox" />
          </label>
        </li>
        <li>
          <label>
            <span>정적인휴식</span>
            <input type="checkbox" />
          </label>
        </li>
        <li>
          <label>
            <span>풀빌라</span>
            <input type="checkbox" />
          </label>
        </li>
        <li>
          <label>
            <span>수영장</span>
            <input type="checkbox" />
          </label>
        </li>
      </CheckList>
    </ModalBack>
  );
}

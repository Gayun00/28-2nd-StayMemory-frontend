import React from 'react';
import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  PeopleTitle,
  ModalBack,
  ModalBtn,
  CheckList,
} from '../List';
import { AiOutlineClose } from 'react-icons/ai';
import { TYPE_DATA } from '../../../utils/constants';
import { useQueryStringArr } from '../../../utils/hooks/useQueryStringArr';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useClickAway from '../../../utils/hooks/useClickAway';

export default function SelectTheme() {
  const {
    addFilterArr,
    handleCheckedAll,
    isCheckedAll,
    isChecked,
    parseArrayToSearchParams,
  } = useQueryStringArr('theme');
  const { clickRef, isOpened, onToggle } = useClickAway();
  const handleChange = e => {
    addFilterArr(e);
  };

  const onClickApplyButton = () => {
    parseArrayToSearchParams();
  };

  return (
    <div ref={clickRef}>
      <ModalBtn onClick={onToggle}>
        테마
        <MdOutlineKeyboardArrowDown />
      </ModalBtn>
      {isOpened && (
        <ModalBack>
          <PeopleTitle>
            테마
            <AiOutlineClose onClick={onToggle} />
          </PeopleTitle>
          <ModalPeopleBtnWrapper onClick={onClickApplyButton}>
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
                  checked={isCheckedAll()}
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
      )}
    </div>
  );
}

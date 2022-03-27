import React, { useState } from 'react';
import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  PeopleTitle,
  ModalBack,
  ModalBtn,
  CheckList,
} from 'pages/List/List';
import { AiOutlineClose } from 'react-icons/ai';
import { TYPE_DATA } from 'utils/constants/constants';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useClickAway from 'utils/hooks/useClickAway';
import useUpdateState from 'utils/hooks/useUpdateState';
import useCheckBox from 'utils/hooks/useCheckBox';
import useQueryString from 'utils/hooks/useQueryString';

export default function SelectTheme() {
  const [selectedTheme, setSelectedTheme] = useState({
    theme: [],
  });
  const { updateState } = useUpdateState(selectedTheme, setSelectedTheme);
  const { isChecked, isCheckedAll, handleCheckedAll } = useCheckBox(
    selectedTheme,
    setSelectedTheme,
    TYPE_DATA.theme
  );
  const { parseObjectToSearchParams } = useQueryString(selectedTheme);
  const { clickRef, isOpened, onToggle } = useClickAway();

  const handleChange = e => {
    const { name } = e.target;
    updateState(name);
  };

  const onClickApplyButton = () => {
    parseObjectToSearchParams();
  };

  return (
    <div ref={clickRef}>
      <ModalBtn onClick={onToggle}>
        스테이 테마
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
                  <label name={obj.type}>
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

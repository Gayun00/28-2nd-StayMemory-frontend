import React from 'react';
import {
  ModalPeopleBtn,
  ModalPeopleBtnWrapper,
  PeopleTitle,
  ModalBack,
  CheckList,
} from 'pages/List/List';
import { AiOutlineClose } from 'react-icons/ai';
import { TYPE_DATA } from 'utils/constants/constants';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useClickAway from 'utils/hooks/useClickAway';
import { useState } from 'react';
import useUpdateState from 'utils/hooks/useUpdateState';
import useCheckBox from 'utils/hooks/useCheckBox';
import useQueryString from 'utils/hooks/useQueryString';

export default function SelectType() {
  const [selectedType, setSelectedType] = useState({
    category: [],
  });
  const { updateState } = useUpdateState(selectedType, setSelectedType);
  const { isChecked, isCheckedAll, handleCheckedAll } = useCheckBox(
    selectedType,
    setSelectedType,
    TYPE_DATA.category
  );
  const { parseObjectToSearchParams } = useQueryString(selectedType);
  const { clickRef, isOpened, onToggle } = useClickAway();

  const handleChange = e => {
    const { name } = e.target;
    updateState(name);
  };

  const onClickApplyButton = () => {
    parseObjectToSearchParams();
  };

  return (
    <Wrapper ref={clickRef}>
      <ModalBtn onClick={onToggle}>
        스테이 유형
        <MdOutlineKeyboardArrowDown />
      </ModalBtn>
      {isOpened && (
        <ModalBack>
          <PeopleTitle>
            스테이유형
            <AiOutlineClose onClick={onToggle} />
          </PeopleTitle>
          <ModalPeopleBtnWrapper>
            <ModalPeopleBtn onClick={onClickApplyButton}>
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
                  checked={isCheckedAll()}
                  onChange={handleCheckedAll}
                />
              </label>
            </li>
            {TYPE_DATA.category.map((item, idx) => {
              return (
                <li key={idx}>
                  <label name={item.type}>
                    <span>{item.type}</span>
                    <input
                      type="checkbox"
                      value="space"
                      name={item.name}
                      checked={isChecked(item.name)}
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

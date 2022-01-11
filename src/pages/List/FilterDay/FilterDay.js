import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BiRefresh } from 'react-icons/bi';

export default function FilterDay() {
  return (
    <FilterDays>
      <Keyword>
        <KeywordTitle>여행지/숙소</KeywordTitle>
        <KeywordInput />
        <KeywordBtn>국내전체</KeywordBtn>
        <KeywordReset>
          <ResetLink to="/list">
            <BiRefresh className="BiRefresh" />
          </ResetLink>
        </KeywordReset>
      </Keyword>
      <CheckInOut>
        <CheckInOutTitle>체크인</CheckInOutTitle>
        <CheckInOutInput placeholder="체크인" aria-label="체크인" />
        <CheckInOutTitle>체크아웃</CheckInOutTitle>
        <CheckInOutInput placeholder="체크아웃" aria-label="체크아웃" />
      </CheckInOut>
    </FilterDays>
  );
}

// function Login() {
//   return (
//     <div>
//       <Link to="/signup">회원가입</Link>
//     </div>
//   );
// }

const ResetLink = styled(Link)``;

const Keyword = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
`;

const FilterDays = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
`;

const KeywordTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-right: 10px;
`;

const KeywordInput = styled.input`
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width: 200px;
  height: 36px;

  &:focus {
    outline: none;
  }
`;

const KeywordBtn = styled.div`
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #f2f2f2;
  width: 140px;
  line-height: 36px;
  margin-left: 14px;
  cursor: pointer;
  padding: 0 12px;
  text-align: left;
`;

const KeywordReset = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  right: 0;
  width: 36px;
  height: 36px;
  background-color: white;
  cursor: pointer;

  & > svg {
    font-size: 36px;
  }
`;

const CheckInOut = styled.div`
  display: flex;
  align-items: center;
`;

const CheckInOutTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-left: 40px;
`;

const CheckInOutInput = styled.input`
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 8px 6px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: black;

  &:focus {
    outline: none;
  }
`;

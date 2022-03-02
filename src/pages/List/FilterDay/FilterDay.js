import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiRefresh } from 'react-icons/bi';
import CalendarS from '../../../components/Modal/SelectDate/CalendarS';

export default function FilterDay() {
  const [startDate, setStartDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const URLSearch = new URLSearchParams(location.search);
  const place = URLSearch.get('city');
  const checkinDate = URLSearch.get('checkin');
  const checkoutDate = URLSearch.get('checkout');
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    startDate && URLSearch.set('checkin', startDate.format('YYYY-MM-DD'));
    endDate && URLSearch.set('checkout', endDate.format('YYYY-MM-DD'));
    navigate(`/list?` + URLSearch.toString());
  }, [focusedInput]);

  return (
    <FilterDays>
      <Keyword>
        <KeywordTitle>여행지/숙소</KeywordTitle>
        <KeywordInput />
        <KeywordBtn>{place || '국내전체'}</KeywordBtn>
        <KeywordReset>
          <ResetLink to="/list">
            <BiRefresh className="BiRefresh" />
          </ResetLink>
        </KeywordReset>
      </Keyword>
      <CheckInOut>
        <CheckInOutTitle>체크인</CheckInOutTitle>
        <CheckInOutInput
          onClick={() => setFocusedInput('startDate')}
          placeholder="체크인"
          aria-label="체크인"
          value={startDate ? startDate.format('YYYY-MM-DD') : checkinDate}
        />
        <CheckInOutTitle>체크아웃</CheckInOutTitle>

        <CheckInOutInput
          onClick={() => setFocusedInput('endDate')}
          placeholder="체크아웃"
          aria-label="체크아웃"
          value={endDate ? endDate.format('YYYY-MM-DD') : checkoutDate}
        />
        <CalendarS
          startDate={startDate}
          endDate={endDate}
          handleDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
        />
      </CheckInOut>
    </FilterDays>
  );
}

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

  .DateInput {
    display: none;
  }
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

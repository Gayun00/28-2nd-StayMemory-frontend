import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SelectPeople from 'pages/List/SelectPeople/SelectPeople';
import SelectPrice from 'pages/List/SelectPrice/SelectPrice';
import SelectType from 'pages/List/SelectType/SelectType';
import SelectTheme from 'pages/List/SelectTheme/SelectTheme';
import FilterDay from 'pages/List/FilterDay/FilterDay';
import HotelList from 'pages/List/HotelList/HotelList';
import styled from 'styled-components';
import { GoLocation } from 'react-icons/go';
import { BsArrowRight } from 'react-icons/bs';
import {
  FETCH_LiST_API_URL,
  게스트하우스,
  호텔,
  부산광역시,
  서울특별시,
  제주특별자치도,
} from 'utils/constants/constants';
import useQueryString from 'utils/hooks/useQueryString';

export default function List() {
  const [hotel, setHotel] = useState([]);
  const { search } = useLocation();
  const { parseQueryIntoObject, makeQueryStringFromObject } = useQueryString();

  const cityQueryParams = {
    jeju: 제주특별자치도,
    seoul: 서울특별시,
    busan: 부산광역시,
  };

  const categoryQueryParams = {
    guesthouse: 게스트하우스,
    hotel: 호텔,
  };

  function changeQueryString() {
    const URLSearch = new URLSearchParams(search);
    const obj = parseQueryIntoObject(URLSearch);
    obj.city && (obj.city = cityQueryParams[obj.city]);
    obj.category &&
      (obj.category = categoryQueryParams[obj.category.split('&')[0]]);

    return makeQueryStringFromObject(obj);
  }

  useEffect(() => {
    const fetchHotelList = async () => {
      try {
        const res = await fetch(FETCH_LiST_API_URL(changeQueryString()));
        const resJson = await res.json();
        setHotel(resJson.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotelList();
  }, [search]);

  return (
    <Container>
      <Title>
        <Slogan>FIND STAY</Slogan>
        <Description>머무는 것 자체로 여행이 되는 공간</Description>
      </Title>
      <Filter>
        <FilterDay />
        <FilterOther>
          <ModalWrapper>
            <SelectPeople />
            <SelectPrice />
            <SelectType />
            <SelectTheme />
            <BtnSelectMap>
              <GoLocation />
            </BtnSelectMap>
          </ModalWrapper>
        </FilterOther>
      </Filter>
      <SearchBtnWrapper>
        <SearchBtn>
          SEARCH
          <BsArrowRight />
        </SearchBtn>
      </SearchBtnWrapper>
      <PreferListWrapper>
        <PreferList>
          <PreferMenu>최신순</PreferMenu>
          <PreferMenu>인기순</PreferMenu>
          <PreferMenu>높은 가격순</PreferMenu>
          <PreferMenu>낮은 가격순</PreferMenu>
        </PreferList>
      </PreferListWrapper>
      <HotelList hotel={hotel} />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;

const Title = styled.div`
  text-align: center;
  padding: 70px 20px;
`;

const Slogan = styled.p`
  font-size: 20px;
  letter-spacing: 8px;
`;

const Description = styled.p`
  font-size: 12px;
  margin: 10px auto;
`;

const Filter = styled.div`
  position: relative;
  margin: 0 auto;
  border-top: 3px solid black;
`;

const FilterOther = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
`;

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
`;

export const ModalBtn = styled.li`
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

export const ModalBack = styled.div`
  position: absolute;
  margin-top: 28px;
  padding: 30px;
  background-color: white;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
`;

export const PeopleTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 22px;

  & > svg {
    font-size: 20px;
    cursor: pointer;
  }
`;

export const RangeWrap = styled.div`
  position: relative;
  height: 10px;
`;

export const MinRangeBar = styled.input.attrs({
  type: 'range',
  min: '0',
  max: '100',
})`
  position: absolute;
`;

export const MaxRangeBar = styled.input.attrs({
  type: 'range',
  min: '0',
  max: '100',
})`
  position: absolute;
  background-color: aliceblue;
  background: transparent;
  -webkit-appearance: none;
`;

export const PeopleCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 12px;

  div {
    display: flex;
    align-items: center;
  }

  span {
    p {
      font-size: 8px;
      margin-right: 22px;
      color: #999;
      margin-top: 5px;
    }
  }
`;

export const CounterButton = styled.button`
  font-size: 16px;
  width: 34px;
  height: 34px;
  border: 1px solid #e4e4e4;
  background-color: #f9fafb;
  cursor: pointer;
  outline: none;
`;

export const InputNum = styled.span`
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  font-size: 14px;

  input {
    appearance: none;
    outline: none;
    display: inline-block;
    border: 0;
    width: 40px;
    background: transparent;
    text-align: right;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  span {
    display: inline-block;
    line-height: 32px;
    margin-right: 10px;
  }
`;

export const ModalPeopleBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ModalPeopleBtn = styled.button`
  font-size: 12px;
  padding: 10px 48px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  border: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const InputHeader = styled.span`
  font-size: 12px;
  color: #999;
`;

export const InputContent = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e4e4e4;
  font-size: 14px;
  margin-top: 8px;

  input {
    font-size: 14px;
    width: 85px;
    height: 32px;
    border: 0;
    text-align: right;
    appearance: none;
    outline: none;
    display: inline-block;
    background: transparent;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const Dash = styled.span`
  padding: 25px 0 0 0;
`;

export const CheckList = styled.ul`
  width: 160px;
  padding-top: 14px;

  li {
    width: 100%;
    margin-top: 15px;

    label {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;

      input {
        left: auto;
        right: 0;
        margin: 0;
        cursor: pointer;
      }

      span {
        width: 100%;
        display: inline-block;
        text-align: center;
        font-size: 14px;
      }
    }
  }
`;

const SearchBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  font-size: 14px;
  margin: 30px auto;
  padding: 0 30px;
  background-color: black;
  color: white;
  border-radius: 100px;
  line-height: 36px;
  letter-spacing: 2.5px;

  & > svg {
    font-size: 18px;
    margin-left: 8px;
  }
`;

const BtnSelectMap = styled.button`
  position: absolute;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  right: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
  background-color: white;

  & > svg {
    font-size: 20px;
  }
`;

const PreferListWrapper = styled.div`
  margin-top: 110px;
  border-bottom: 2px solid black;
  font-size: 14px;
`;

const PreferList = styled.div`
  display: flex;
  justify-content: flex-end;
  list-style: none;
  padding-bottom: 6px;
`;

const PreferMenu = styled.div`
  margin-left: 20px;
  cursor: pointer;
  color: rgb(153, 153, 153);
`;

export const Slider = styled.input``;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowRoundBack, IoIosArrowDown } from 'react-icons/io';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import showModalState, {
  disabledDatesState,
  selectedDatesState,
} from '../../components/Modal/GlobalState';
import { useParams } from 'react-router-dom';
// import SelectDateFindStay from '../'

function Detail() {
  const [detail, setDetail] = useState({});
  const setModal = useSetRecoilState(showModalState);
  const selectedDates = useRecoilValue(selectedDatesState);
  const [disabledDates, setDisabledDates] = useRecoilState(disabledDatesState);
  const params = useParams();

  useEffect(() => {
    fetch(`/data/detail${params.hotelName}.json`)
      .then(res => res.json())
      .then(res => setDetail(res));
  }, []);

  function showDatesModal() {
    setModal('date_detail');
  }

  function getUnavaliableDate() {
    console.log('ddfsdf');
    fetch(
      `http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/stays/2/unavailable-date?start-date=2022-01-01`
    )
      .then(res => res.json())
      // .then(res => console.log(res.data));
      .then(res => setDisabledDates([...res.data.date]));
    // .then(res => setDisabledDates(...res.data.date));
  }

  useEffect(() => {
    console.log(disabledDates);
  }, [disabledDates]);

  function onClickDates() {
    showDatesModal();
    getUnavaliableDate();
  }

  return (
    <Wrapper>
      <Container>
        <HeaderWrapper>
          <Title>BOOKING</Title>
          <BackWrapper>
            <IoIosArrowRoundBack />
            <p>돌아가기</p>
          </BackWrapper>
          <SelectWrapper>
            <h2>{detail.hotelName}</h2>
            <SelectDateWrapper onClick={onClickDates}>
              {selectedDates.check_out !== null ? (
                <p>{`${selectedDates.checkin}~${selectedDates.checkout}`}</p>
              ) : (
                <>
                  <div>날짜를 선택해주세요</div>
                  <IoIosArrowDown />
                </>
              )}
            </SelectDateWrapper>
            <BookButton>
              <button>결제하기</button>
            </BookButton>
          </SelectWrapper>
        </HeaderWrapper>
        <ContentWrapper>
          <RoomInfoWrapper>
            <RoomInfoTitleWrapper>
              <RoomInfoTitle>ROOM INFORMATION</RoomInfoTitle>
              <HotelName>{detail.hotelName}</HotelName>
            </RoomInfoTitleWrapper>
            <p>-</p>
            <HotelDescription>{detail.hotelDescription}</HotelDescription>
            <RoomDescription>
              <p>
                체크인 {detail.checkin}/ 체크아웃 {detail.checkout}
              </p>
              <p>
                기준 인원 {detail.headCount}명 (최대 인원 {detail.headCount}명)
              </p>
              <p>객실면적 {detail.area}m</p>
              <p>{detail.bed}</p>
            </RoomDescription>
          </RoomInfoWrapper>
          <RoomImgWrapper>
            <img src={detail.img} alt="detail_img" />
          </RoomImgWrapper>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0 0 0;
  padding: 80px;
  width: 100vw;
  text-align: center;
`;

const Container = styled.div`
  max-width: 80rem;
  min-width: 60rem;
`;

const HeaderWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  letter-spacing: 1rem;
  font-size: 1.3rem;
`;

const BackWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > svg {
    font-size: 1.4rem;
    color: darkgray;
  }

  & > p {
    font-size: 0.8rem;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0rem 1rem 0;
  border-bottom: 1px solid lightgray;

  & > h2 {
    font-size: 2rem;
  }

  & > div {
    cursor: pointer;
  }
`;

const SelectDateWrapper = styled.span`
  display: flex;
  cursor: pointer;

  & > svg {
    margin-left: 0.5rem;
  }
`;

const BookButton = styled.div`
  & > button {
    width: 14rem;
    height: 2.5rem;
    background-color: black;
    border: none;
    color: white;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 3rem;
`;

const RoomInfoWrapper = styled.aside`
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const RoomInfoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const RoomImgWrapper = styled.article`
  display: flex;
  justify-content: center;
  width: 40rem;

  & > img {
    width: 100%;
  }
`;

const RoomInfoTitle = styled.h1`
  font-size: 0.5rem;
`;

const HotelName = styled.h2`
  margin: 1rem 0 2rem 0;
  font-size: 2rem;
`;

const HotelDescription = styled.p`
  text-align: start;
  line-height: 1.5rem;
  font-size: 0.8rem;
`;

const RoomDescription = styled.div`
  text-align: start;
  line-height: 1.3rem;
  margin-top: 6rem;
  font-size: 0.8rem;
`;

export default Detail;

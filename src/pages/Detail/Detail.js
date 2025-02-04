import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useParams, useNavigate } from 'react-router-dom';
import ReservationDate from './ReservationDate/ReservationDate';
import ReservationButton from './ReservationDate/ReservationButton';
import Like from 'components/Like/Like';
import { FETCH_LiST_API_URL } from 'utils/constants/constants';

function Detail() {
  const [detail, setDetail] = useState([]);
  const params = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadDetailData();
  }, []);

  function loadDetailData() {
    fetch(FETCH_LiST_API_URL(params.id))
      .then(res => res.json())
      .then(res => setDetail([res.data]))
      .catch(err => console.error(err));
  }

  function onClickGoBack() {
    navigate(-1);
  }
  const stay = detail[0];
  return (
    <Wrapper>
      {detail.length && (
        <Container>
          <HeaderWrapper>
            <Title>BOOKING</Title>
            <BackWrapper>
              <BackContainer onClick={onClickGoBack}>
                <IoIosArrowRoundBack />
                <p>돌아가기</p>
              </BackContainer>
            </BackWrapper>
            <SelectWrapper>
              <HotelTitleWrapper>
                <HotelTitleName>{stay.hotelName}</HotelTitleName>
                <Like id={params.id} />
              </HotelTitleWrapper>
              <SelectDateWrapper>
                <ReservationDate
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
                <ReservationButton startDate={startDate} endDate={endDate} />
              </SelectDateWrapper>
            </SelectWrapper>
          </HeaderWrapper>
          <ContentWrapper>
            <RoomInfoWrapper>
              <RoomInfoTitleWrapper>
                <RoomInfoTitle>ROOM INFORMATION</RoomInfoTitle>
                <HotelName>{stay.hotelName}</HotelName>
              </RoomInfoTitleWrapper>
              <p>-</p>
              <HotelDescription>{stay.hotelDescription}</HotelDescription>
              <RoomDescription>
                <p>
                  체크인 {stay.checkin}/ 체크아웃 {stay.checkout}
                </p>
                <p>
                  기준 인원 {stay.headCount}명 (최대 인원 {stay.headCount}명)
                </p>
                <p>객실면적 {stay.area}m</p>
              </RoomDescription>
            </RoomInfoWrapper>
            <RoomImgWrapper>
              <img src={stay.img} alt="detail_img" />
            </RoomImgWrapper>
          </ContentWrapper>
        </Container>
      )}
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
`;

const BackContainer = styled.button`
  display: flex;
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

const HotelTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HotelTitleName = styled.h2`
  margin-right: 10px;
`;

const SelectDateWrapper = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;

  & > svg {
    margin-left: 0.5rem;
  }
`;

// const CalenderContainer = styled.div`
//   position: absolute;
// `;

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
  font-size: 1.5rem;
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

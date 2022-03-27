import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Like from 'components/Like/Like';

export default function HotelList({ hotel }) {
  const navigate = useNavigate();
  function goToDetail(id) {
    navigate(`/findstay/${id}`);
  }
  return (
    <HotelListWrapper>
      {hotel &&
        hotel.map(ele => (
          <HotelLists key={ele.id}>
            <HotelNameKor>{ele.hotelNameKor}</HotelNameKor>
            <HotelType>{ele.stayType}</HotelType>
            <HotelContentList>
              <HotelContent>
                <Address>{ele.address}</Address>
                <Num>
                  기준 {ele.baseNum}명 (최대 {ele.maxNum} 명)
                </Num>
                <Price>₩{ele.price}</Price>
                <p onClick={() => goToDetail(ele.id)}>예약하기</p>
              </HotelContent>
              <ImgContainer>
                <Img
                  onClick={() => goToDetail(ele.id)}
                  src={ele.img}
                  alt="호텔이미지"
                />
                <LikeWrapper>
                  <Like id={ele.id} />
                </LikeWrapper>
              </ImgContainer>
            </HotelContentList>
          </HotelLists>
        ))}
    </HotelListWrapper>
  );
}

const HotelListWrapper = styled.div`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
`;

const HotelNameKor = styled.div`
  font-size: 32px;
`;

const HotelLists = styled.div`
  width: 48%;
  margin: 50px 0 50px 0;
`;

const HotelType = styled.div`
  font-size: 12px;
  margin-top: 6px;
`;

const HotelContentList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HotelContent = styled.div`
  width: 30%;
  font-size: 14px;
  line-height: 2;
  color: #333333;
  cursor: pointer;
  margin-top: 120px;

  p {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    line-height: 30px;
    margin-top: 46px;
    border-bottom: 1px solid #000;
  }
`;

const ImgContainer = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 60%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
`;

const LikeWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const Address = styled.div``;

const Num = styled.div``;

const Price = styled.div``;

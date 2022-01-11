import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function HotelList({ hotel }) {
  // const [hotel, setHotel] = useState([]);

  // useEffect(() => {
  //   fetch('http://10.58.5.136:8000/stays')
  //     .then(res => res.json())
  //     // .then(res => console.log(res));
  //     .then(res => setHotel(res.data));
  // }, []);

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
                <p>예약하기</p>
              </HotelContent>
              <Img src={ele.img} alt="호텔이미지" />
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

const Img = styled.img`
  width: 60%;
`;

const Address = styled.div``;

const Num = styled.div``;

const Price = styled.div``;

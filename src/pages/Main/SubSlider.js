import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import Like from '../../components/Like/Like';

function SubSlider({ subSlide }) {
  const navigate = useNavigate();
  function onClickHotel(hotelId) {
    navigate(`/findstay/${hotelId}`);
  }

  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Wrapper>
      <SliderWrapper>
        <Slider {...settings}>
          {subSlide.map((hotel, idx) => (
            <ItemContainer key={idx} onClick={() => onClickHotel(hotel.id)}>
              <ImgContainer>
                <Img img={hotel.img} />
                <LikesWrapper>
                  <Like />
                </LikesWrapper>
              </ImgContainer>
              <HotelInfoWrap>
                <HotelTitle>{hotel.hotelNameKor}</HotelTitle>
                <TextWrap>
                  <HotelLocation>{hotel.location}</HotelLocation>
                  <HotelPrice>{hotel.price}</HotelPrice>
                </TextWrap>
                <ReadMore>read more</ReadMore>
              </HotelInfoWrap>
            </ItemContainer>
          ))}
        </Slider>
      </SliderWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 80vw;
  margin-bottom: 3rem;
`;

const SliderWrapper = styled.div``;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 22rem;
`;

const ImgContainer = styled.div`
  position: relative;
  height: 60%;
  background-color: lightblue;
`;

const Img = styled.img.attrs(hotel => ({
  src: hotel.img,
  alt: hotel.name,
}))`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const LikesWrapper = styled.div`
  /* position: absolute;*/
  transform: translateY(-110%);
`;

const HotelInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const HotelTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const TextWrap = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const HotelLocation = styled.p`
  font-size: ${props => props.theme.fontMedium};
`;

const HotelPrice = styled.p``;

const ReadMore = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
`;

export default SubSlider;

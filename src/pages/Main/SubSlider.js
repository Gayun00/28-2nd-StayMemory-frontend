import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SubSlider({ subSlide }) {
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
            <ImgContainer key={idx}>
              <img className="slideImg" src={hotel.img} alt={hotel.name} />
              <HotelInfoWrap>
                <HotelTitle>{hotel.hotelNameKor}</HotelTitle>
                <TextWrap>
                  <HotelLocation>{hotel.location}</HotelLocation>
                  <HotelPrice>{hotel.price}</HotelPrice>
                </TextWrap>
                <ReadMore>read more</ReadMore>
              </HotelInfoWrap>
            </ImgContainer>
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

  .prev {
    position: absolute;
    width: 4.5rem;
    height: 7.5rem;
    background-color: transparent;
    border: none;
    transform: translate(188%, 355%);
    z-index: 5;
  }

  .next {
    position: absolute;
    width: 4.5rem;
    height: 7.5rem;
    background-color: transparent;
    border: none;
    transform: translate(290%, -205%);
    z-index: 5;
  }

  .arrowBack {
    font-size: 2rem;
    color: white;
    opacity: 0.6;
  }

  .arrowForward {
    font-size: 2rem;
    color: white;
    opacity: 0.6;
  }

  .slideNum {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8.5rem;
    height: 7.5rem;
    opacity: 0.7;
    background-color: black;
    color: white;
    font-size: 1.5rem;
    transform: translateY(56%);
  }

  .slideButtons {
    width: 8.7rem;
    height: 7.5rem;
    opacity: 0.7;
    background-color: black;
    transform: translate(98%, 56%);
    z-index: 1;
  }
`;

const SliderWrapper = styled.div``;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
    width: 100%;
    height: 30%;
  }
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

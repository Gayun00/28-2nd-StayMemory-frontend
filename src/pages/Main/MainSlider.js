import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';

function Banner() {
  const [banners, setBanners] = useState([]);
  async function fetchBannersData() {
    try {
      const response = await fetch('/data/banner.json');
      const data = await response.json();
      const updated = [...data, ...data, ...data];
      setBanners(updated);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchBannersData();
  }, []);

  const SLIDE_WIDTH = 1440;
  const slideRef = useRef();

  const BANNERS_COUNT = banners.length / 3;
  const TOTAL_BANNERS_COUNT = banners.length;
  const START = (TOTAL_BANNERS_COUNT * 1) / 3 + 1;
  const END = (TOTAL_BANNERS_COUNT * 2) / 3;
  const PREV_END = (TOTAL_BANNERS_COUNT * 1) / 3;
  const NEXT_START = (TOTAL_BANNERS_COUNT * 2) / 3 + 1;

  const [slide, setSlide] = useState({
    number: START,
    withMotion: true,
  });

  useEffect(() => {
    slideRef.current.style.transform = `translateX(-${
      SLIDE_WIDTH * (slide.number - 1)
    }px)`;
    slideRef.current.style.transition = slide.withMotion
      ? 'all 0.5s ease-in'
      : '';
  }, [slide, SLIDE_WIDTH]);

  function slideAfterMoveToTheEnd() {
    setSlide({
      number: END - 1,
      withMotion: true,
    });
  }

  function slideAfterMoveToTheStart() {
    setSlide({
      number: START + 1,
      withMotion: true,
    });
  }

  const passTheFirstSlide = slide.number === PREV_END;
  const passTheLastSlide = slide.number === NEXT_START;

  function onClickPrev() {
    if (passTheFirstSlide) {
      setSlide({
        number: END,
        withMotion: false,
      });
      setTimeout(() => {
        slideAfterMoveToTheEnd();
      }, 50);
    } else {
      setSlide({
        number: slide.number - 1,
        withMotion: true,
      });
    }
  }

  function onClickNext() {
    if (passTheLastSlide) {
      setSlide({
        number: START,
        withMotion: false,
      });
      setTimeout(() => {
        slideAfterMoveToTheStart();
      }, 50);
    } else {
      setSlide({
        number: slide.number + 1,
        withMotion: true,
      });
    }
  }

  function slideNum() {
    if (slide.number <= 10 && slide.number > BANNERS_COUNT) {
      return slide.number - BANNERS_COUNT;
    } else if (slide.number <= BANNERS_COUNT) {
      return slide.number;
    } else if (slide.number > 10) {
      return slide.number - 10;
    } else if (slide.number < 0) {
      return slide.number + BANNERS_COUNT;
    }
  }

  return (
    <Wrapper className="banner">
      <div className="bannerWrap">
        <Container className="bannerContainer">
          <List className="list" ref={slideRef}>
            {banners.map((banner, idx) => (
              <article key={idx} className="item">
                <BannerImg className="itemImg" src={banner.img} alt="" />
              </article>
            ))}
          </List>
        </Container>
        <ButtonsWrap className="buttons">
          <SlideNum>
            <Num>
              {slideNum()}/{BANNERS_COUNT}
            </Num>
          </SlideNum>
          <ButtonPrev>
            <MdKeyboardArrowLeft className="prev" onClick={onClickPrev} />
          </ButtonPrev>
          <ButtonNext>
            <MdKeyboardArrowRight className="next" onClick={onClickNext} />
          </ButtonNext>
        </ButtonsWrap>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Container = styled.div`
  width: 1440px;
  height: 800px;
  overflow: hidden;
`;
const List = styled.div`
  display: flex;
`;
const BannerImg = styled.img`
  width: 1440px;
`;

const SlideNum = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;
  background-color: black;
  border-right: 0.5px solid lightgray;
  color: white;
  font-size: 1.6rem;
`;
const Num = styled.p``;

const ButtonsWrap = styled.div`
  display: flex;
  width: 15rem;
  height: 7rem;
  background-color: pink;
  opacity: 0.8;
  transform: translateY(-100%);
`;

const ButtonPrev = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 30%;
  background-color: black;
  border: none;
  font-size: 2rem;

  & > svg {
    color: white;
  }
`;

const ButtonNext = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 30%;
  background-color: black;
  border: none;
  font-size: 2rem;

  & > svg {
    color: white;
  }
`;

export default Banner;

import React, { useEffect, useState } from 'react';
import MainSlider from './MainSlider';
import SubSlider from './SubSlider';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Main() {
  const [mainSlide, setMainSlide] = useState([]);
  const [subSlide, setSubSlide] = useState([]);
  useEffect(() => {
    fetch('/data/mainSlider.json')
      .then(res => res.json())
      .then(res => setMainSlide([...res]));

    fetch(
      'http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/stays?offset=0&limit=5'
    )
      .then(res => res.json())
      // .then(res => console.log(res.data));
      .then(res => setSubSlide([...res.data]));
  }, []);

  useEffect(() => {
    console.log(subSlide.slice(0, 4));
  }, [subSlide]);
  const slicedSubSlide = subSlide.slice(0, 9);

  return (
    <Wrapper>
      <MainSlider mainSlide={mainSlide} />
      {subSlide.length && <SubSlider subSlide={slicedSubSlide} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default Main;

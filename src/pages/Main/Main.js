import React, { useEffect, useState } from 'react';
import MainSlider from './MainSlider';
import SubSlider from './SubSlider';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FETCH_LiST_API_URL } from 'utils/constants/constants';

function Main() {
  const [mainSlide, setMainSlide] = useState([]);
  const [subSlide, setSubSlide] = useState([]);
  useEffect(() => {
    fetch('/data/mainSlider.json')
      .then(res => res.json())
      .then(res => setMainSlide([...res]))
      .catch(err => console.error(err));

    fetch(FETCH_LiST_API_URL)
      .then(res => res.json())
      .then(res => setSubSlide([...res.data]))
      .catch(err => console.error(err));
  }, []);

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

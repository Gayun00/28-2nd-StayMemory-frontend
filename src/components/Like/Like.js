import React, { useState } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import styled from 'styled-components';

function Like({ id }) {
  const [heart, setHeart] = useState(false);
  const LOGIN_TOKEN = sessionStorage.getItem('loginToken');

  function clickHeart() {
    setHeart(!heart);
    fetch(
      'http://ec2-3-36-124-170.ap-northeast-2.compute.amazonaws.com/wishlists',
      {
        method: 'POST',
        headers: {
          Authorization: LOGIN_TOKEN,
        },
        body: JSON.stringify({
          stayId: id,
        }),
      }
    );
  }

  return (
    <Wrapper onClick={clickHeart}>
      <div>
        {heart ? (
          <div>
            <RiHeartFill size="20px" />
          </div>
        ) : (
          <div onClick={clickHeart}>
            <RiHeartLine size="20px" color="pink" />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: turquoise;
`;

export default Like;

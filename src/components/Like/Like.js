import React, { useState } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import styled from 'styled-components';

function Like(props) {
  const [heart, setHeart] = useState(false);

  function clickHeart() {
    setHeart(!heart);
    fetch('http://192.168.243.37:8082/wishlists', {
      method: 'POST',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.AekHFMguragxj6mgkwhioYrEzr6tOktCW-vOYLj1P9M',
      },
    }).then(response => response.json());
  }

  return (
    <div>
      <div>
        {heart ? (
          <div onClick={clickHeart}>
            <RiHeartFill size="20px" />
          </div>
        ) : (
          <div onClick={clickHeart}>
            <RiHeartLine size="20px" color="pink" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Like;

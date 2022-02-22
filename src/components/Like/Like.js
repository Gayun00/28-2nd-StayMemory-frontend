import React, { useState } from 'react';

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
    })
      .then(response => response.json())
      .then(response => console.log(response));
  }

  return (
    <div>
      <div>
        {heart ? (
          <img src="/images/heart2.png" alt="꽉 찬 하트" onClick={clickHeart} />
        ) : (
          <img src="/images/heart1.png" alt="텅 빈 하트" onClick={clickHeart} />
        )}
      </div>
    </div>
  );
}

export default Like;

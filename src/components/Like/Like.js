import React, { useState } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { WISHLIST_URL } from '../../utils/constants';
import { useError } from '../../utils/hooks/useError';

function Like({ id }) {
  const [heart, setHeart] = useState(false);
  const LOGIN_TOKEN = sessionStorage.getItem('loginToken');
  const { throwError, catchError } = useError();
  const [isInWishList, setIsInWishList] = useState(false);

  async function fetchWishlist() {
    const res = await fetch(WISHLIST_URL, {
      method: 'GET',
      headers: {
        Authorization: LOGIN_TOKEN,
      },
    });
    const resJson = await res.json();
    const wishlist = resJson.data;
    wishlist.forEach(stay => {
      stay.hotelId === id ? setIsInWishList(true) : setIsInWishList(false);
    });
  }

  async function addToWishlist() {
    try {
      setHeart(!heart);
      const res = await fetch(WISHLIST_URL, {
        method: 'POST',
        headers: {
          Authorization: LOGIN_TOKEN,
        },
        body: JSON.stringify({
          stayId: id,
        }),
      });
      const resJson = await res.json();
      if (!res.ok) {
        throwError(resJson);
      }
    } catch (err) {
      catchError(err);
    }
    await fetchWishlist();
  }

  return (
    <div onClick={addToWishlist}>
      <div>
        {isInWishList ? (
          <RiHeartFill size="20px" />
        ) : (
          <RiHeartLine size="20px" color="pink" />
        )}
      </div>
    </div>
  );
}

export default Like;

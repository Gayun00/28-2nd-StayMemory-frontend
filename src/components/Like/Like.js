import React, { useEffect, useState } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { WISHLIST_URL } from '../../utils/constants';
import useFetch from '../../utils/hooks/useFetch';

function Like({ id }) {
  const clickedId = Number(id);
  const [isInWishList, setIsInWishList] = useState(false);

  const { getRequestWithAuth, postRequest } = useFetch();

  async function fetchWishlist() {
    const wishlist = await getRequestWithAuth(WISHLIST_URL);

    wishlist.forEach(stay => {
      if (stay.hotelId === clickedId) {
        setIsInWishList(true);
      } else {
        setIsInWishList(false);
      }
    });
  }
  async function addToWishlist() {
    await postRequest(
      WISHLIST_URL,
      JSON.stringify({
        stayId: id,
      })
    );
    await fetchWishlist();
  }

  return (
    <div onClick={addToWishlist}>
      <div>
        {isInWishList ? (
          <RiHeartFill size="30px" color="lightgray" />
        ) : (
          <RiHeartLine size="30px" color="lightgray" />
        )}
      </div>
    </div>
  );
}

export default Like;

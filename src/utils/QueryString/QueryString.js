import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const convertToQs = (page, obj) => {
  const queryString = Object.entries(obj)
    .map(el => el.join('='))
    .join('&');
  return `/${page}?${queryString}`;
};

export default convertToQs;

export const useQueryString = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const URLSearch = new URLSearchParams(search);

  const handleSearchParams = (page, obj, type) => {
    Object.entries(obj).map(([key, value]) => {
      if (value.length) {
        if (type === 'multiple') {
          return URLSearch.set(key, value.join('&'));
        } else {
          return URLSearch.set(key, value);
        }
      }
    });
    navigate(`/${page}?` + URLSearch.toString());
  };
  return { handleSearchParams };
};

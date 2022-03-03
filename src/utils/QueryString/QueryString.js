import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { filterConditionState } from '../../pages/List/listState';

export const convertToQs = (page, obj) => {
  const queryString = Object.entries(obj)
    .map(el => el.join('='))
    .join('&');
  return `/${page}?${queryString}`;
};

export default convertToQs;

export const useQueryString = () => {
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);
  const { search } = useLocation();
  const navigate = useNavigate();
  let URLSearch = new URLSearchParams(search);

  useEffect(() => {
    URLSearch = new URLSearchParams(search);
  }, [search]);

  const handleSearchParams = (objKey, type = 'string', page = 'list') => {
    const objValue = filterCondition[objKey];

    if (type === 'array') {
      URLSearch.set(objKey, objValue);
    } else if (type === 'object') {
      let valueArr = [];
      Object.entries(objValue).map(([key, value]) => {
        if (value) {
          valueArr.push(key + '=' + value);
        }
      });
      URLSearch.set(objKey, valueArr.join('&'));
    } else {
      URLSearch.set(objKey, objValue);
    }

    navigate(`/${page}?` + URLSearch.toString());
  };
  return { handleSearchParams, URLSearch };
};

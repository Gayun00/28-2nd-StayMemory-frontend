import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TYPE_DATA } from '../constants';
export const convertToQs = (page, obj) => {
  const queryString = Object.entries(obj)
    .map(el => el.join('='))
    .join('&');
  return `/${page}?${queryString}`;
};

export const useQueryStringArr = objKey => {
  const { search } = useLocation();
  const navigate = useNavigate();
  let URLSearch = new URLSearchParams(search);

  const [selectedList, setSelectedList] = useState([]);

  const addFilterArr = e => {
    let updatedList = [];
    const { name } = e.target;
    if (!selectedList.includes(name)) {
      updatedList = [...selectedList, name];
    } else {
      updatedList = [...selectedList].filter(cate => {
        return cate !== name;
      });
    }
    setSelectedList(updatedList);
  };

  const handleCheckedAll = () => {
    let updatedList = [];

    if (!isCheckedAll()) {
      TYPE_DATA[objKey].forEach(obj => {
        updatedList.push(obj.name);
      });
    }

    setSelectedList(updatedList);
  };

  const isCheckedAll = () => {
    return TYPE_DATA[objKey].every(obj => selectedList.includes(obj.name));
  };

  const isChecked = property => {
    return selectedList.includes(property);
  };

  const parseArrayToSearchParams = (page = 'list') => {
    URLSearch.set(objKey, selectedList.join('&'));
    navigate(`/${page}?` + URLSearch.toString());
  };

  return {
    addFilterArr,
    handleCheckedAll,
    isCheckedAll,
    isChecked,
    parseArrayToSearchParams,
  };
};

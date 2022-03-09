import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryStringObject = (objKey, stateObj) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  let URLSearch = new URLSearchParams(search);

  const [selectedListObject, setSelectedListObject] = useState(stateObj);
  const addFilterObject = (name, updatedResult) => {
    const updatedObject = {
      ...selectedListObject,
      [name]: updatedResult,
    };

    setSelectedListObject(updatedObject);
  };

  useEffect(() => {
    console.log(selectedListObject);
  }, [selectedListObject]);

  const parseObjectToSearchParams = (page = 'list') => {
    let valueArr = [];
    Object.entries(selectedListObject).map(([key, value]) => {
      if (value) {
        valueArr.push(key + '=' + value);
      }
    });
    URLSearch.set(objKey, valueArr.join('&'));
    navigate(`/${page}?` + URLSearch.toString());
    console.log(URLSearch.toString());
  };

  return {
    selectedListObject,
    addFilterObject,
    parseObjectToSearchParams,
  };
};

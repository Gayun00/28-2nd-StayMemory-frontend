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

  const parseObjectToSearchParams = (page = 'list') => {
    let valueArr = [];
    Object.entries(selectedListObject).map(([key, value]) => {
      if (value) {
        valueArr.push(key + '=' + value);
      }
    });
    URLSearch.set(objKey, valueArr.join('&'));
    navigate(`/${page}?` + URLSearch.toString());
  };

  const parseQueryIntoObject = querystring => {
    const params = new URLSearchParams(querystring);
    const obj = {};

    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = params.getAll(key);
      } else {
        obj[key] = params.get(key);
      }
    }

    return obj;
  };

  return {
    selectedListObject,
    setSelectedListObject,
    addFilterObject,
    parseObjectToSearchParams,
    parseQueryIntoObject,
  };
};

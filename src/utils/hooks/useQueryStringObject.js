import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryStringObject = stateObj => {
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

  const parseObjectToSearchParams = (
    obj = selectedListObject,
    page = 'list'
  ) => {
    Object.entries(obj).map(([key, value]) => {
      value && URLSearch.set(key, value);
    });
    navigate(`/${page}?` + URLSearch.toString());
  };

  const parseQueryIntoObject = querystring => {
    console.log(querystring);
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

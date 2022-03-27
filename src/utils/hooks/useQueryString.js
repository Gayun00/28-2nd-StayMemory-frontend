import { useLocation, useNavigate } from 'react-router-dom';

function useQueryString(state) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const parseObjectToSearchParams = (obj = state, page = 'list') => {
    const URLSearch = new URLSearchParams(search);

    let updatedValue;

    Object.entries(obj).map(([key, value]) => {
      updatedValue = Array.isArray(value) ? value.join('&') : value;

      value && URLSearch.set(key, updatedValue);
    });
    navigate(`/${page}?` + URLSearch.toString());
  };

  const makeQueryStringFromObject = object => {
    const result = [];
    for (let [k, v] of Object.entries(object)) {
      if (Array.isArray(v)) {
        result.push(...v.map(el => `${k}=${el}`));
      } else {
        result.push(`${k}=${v}`);
      }
    }
    return '?' + result.join('&');
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
    makeQueryStringFromObject,
    parseQueryIntoObject,
    parseObjectToSearchParams,
  };
}

export default useQueryString;

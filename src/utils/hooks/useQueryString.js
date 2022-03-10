import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQueryString(paramKey) {
  const [selectedState, setSelectedState] = useState('');
  const { search } = useLocation();
  const URLSearch = new URLSearchParams(search);
  const navigate = useNavigate();

  const parseStringToSearchParams = (str = selectedState, page = 'list') => {
    URLSearch.set(paramKey, str);
    navigate(`/${page}?` + URLSearch.toString());
  };
  return { selectedState, setSelectedState, parseStringToSearchParams };
}

export default useQueryString;

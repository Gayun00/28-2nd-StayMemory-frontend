import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { filterConditionState } from '../pages/List/listState';
import { TYPE_DATA } from './constants';
export const convertToQs = (page, obj) => {
  const queryString = Object.entries(obj)
    .map(el => el.join('='))
    .join('&');
  return `/${page}?${queryString}`;
};

export const useQueryString = objKey => {
  const { search } = useLocation();
  const navigate = useNavigate();
  let URLSearch = new URLSearchParams(search);

  const [selectedList, setSelectedList] = useState([]);
  const [selectedListObject, setSelectedListObject] = useState({});

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

    if (!isCheckedAll) {
      TYPE_DATA[objKey].forEach(obj => {
        updatedList.push(obj.name);
      });
    }

    setSelectedList(updatedList);
  };
  const isCheckedAll = TYPE_DATA[objKey].every(obj =>
    selectedList.includes(obj.name)
  );

  const isChecked = property => {
    return selectedList.includes(property);
  };

  const parseArrayToSearchParams = (page = 'list') => {
    URLSearch.set(objKey, selectedList.join('&'));
    navigate(`/${page}?` + URLSearch.toString());
  };

  // const parseObjectToSearchParams = (page = 'list') => {
  //   const objValue = filterCondition[objKey];

  //   let valueArr = [];
  //   Object.entries(objValue).map(([key, value]) => {
  //     if (value) {
  //       valueArr.push(key + '=' + value);
  //     }
  //   });
  //   URLSearch.set(objKey, valueArr.join('&'));
  // };

  return {
    addFilterArr,
    handleCheckedAll,
    isCheckedAll,
    isChecked,
    parseArrayToSearchParams,
  };
};
export const useClickAway = () => {
  const [isOpened, setIsOpened] = useState(false);
  const clickRef = useRef();

  useEffect(() => {
    const handleDocumentClick = event => {
      const node = clickRef.current;
      const nodeHTML = node.innerHTML;
      const targetHTML = event.target.innerHTML;

      if (!nodeHTML.includes(targetHTML)) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [clickRef.current]);
  return { isOpened, setIsOpened, clickRef };
};

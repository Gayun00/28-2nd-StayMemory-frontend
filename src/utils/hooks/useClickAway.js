import { useEffect, useRef, useState } from 'react';

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

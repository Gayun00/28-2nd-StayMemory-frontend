import { useEffect, useRef, useState } from 'react';

export default function useClickAway() {
  const [isOpened, setIsOpened] = useState(false);
  const clickRef = useRef(null);

  function handleClickAway(e) {
    const target = e.target;
    if (!clickRef.current?.contains(target)) setIsOpened(false);
  }

  function onToggle() {
    setIsOpened(!isOpened);
  }

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', handleClickAway);
    } else {
      document.removeEventListener('click', handleClickAway);
    }
    return () => {
      document.removeEventListener('click', handleClickAway);
    };
  }, [isOpened]);
  return { clickRef, isOpened, onToggle };
}

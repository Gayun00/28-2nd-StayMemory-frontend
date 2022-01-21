import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { HiUser, HiOutlineLocationMarker } from 'react-icons/hi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import ModalPortal from '../Modal/ModalPortal';
import { useRecoilState } from 'recoil';
import { showModalState } from '../Modal/GlobalState';
import { useNavigate } from 'react-router';

function Nav() {
  const [modal, setModal] = useRecoilState(showModalState);
  const isLoggedIn = sessionStorage.getItem('access_token');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  function handleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  function goToPage(page) {
    navigate(page);
  }

  return (
    <Wrapper>
      <Logo onClick={() => goToPage('/')}></Logo>
      <FilterWrap>
        <span className="location">
          <HiOutlineLocationMarker />
          <FilterButton onClick={() => setModal('location')}>
            어디로 떠날까요?
          </FilterButton>
        </span>
        <span className="date">
          <AiOutlineCalendar />
          <FilterButton onClick={() => setModal('date')}>
            언제 떠날까요?
          </FilterButton>
        </span>
      </FilterWrap>
      <MenuWrap>
        <span onClick={() => goToPage('/list')}>FIND STAY</span>
        <span>PROMOTION</span>
        <span>JOURNAL</span>
        <span>PRE-ORDER</span>
      </MenuWrap>
      <UserWrap>
        {isLoggedIn && <HiUser />}
        <button className="login" onClick={() => goToPage('/login')}>
          {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
        </button>
        {isDarkMode ? (
          <BsToggleOff onClick={handleDarkMode} />
        ) : (
          <BsToggleOn onClick={handleDarkMode} />
        )}
      </UserWrap>

      {modal !== null && (
        <ModalPortal>
          <Modal />
        </ModalPortal>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 80rem;
  height: 5rem;
  padding: 0 3rem 0 3rem;
  border-bottom: 1px solid lightgrey;
  font-size: 0.9rem;
`;

const Logo = styled.img.attrs(() => ({
  src: '/images/logo.png',
}))`
  width: 4.2rem;
`;

const FilterWrap = styled.div`
  display: flex;

  & > span {
    display: flex;
    align-items: center;
    padding: 0 1.3rem 0 1.3rem;
  }

  & > span:nth-child(2) {
    border-left: 1px solid lightgrey;
  }

  & > span > svg {
    margin-right: 0.3rem;
    font-size: 1.5rem;
  }
`;

const FilterButton = styled.span`
  cursor: pointer;
`;

const MenuWrap = styled.span`
  display: flex;
  justify-content: space-around;

  & > span {
    padding: 0 0.5rem 0 0.5rem;
    font-weight: 600;
  }
`;

const UserWrap = styled.span`
  display: flex;
  align-items: center;
  padding-left: 2.6rem;
  border-left: 1px solid lightgrey;

  & > button {
    background-color: transparent;
    border: none;
    font-weight: 600;
    /* font-size: 1.2rem; */
  }

  & > svg {
    margin-left: 0.4rem;
    font-size: 1.5rem;
  }
`;

export default Nav;

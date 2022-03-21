import * as React from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

export default function Modal({ children, onClose }) {
  return (
    <Background>
      <ModalContainer>
        <GrClose onClick={onClose} />
        {children}
      </ModalContainer>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background-color: rgb(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  padding: 30px;
  background-color: white;
  border-radius: 20px;

  & > svg {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

import ReactDOM from 'react-dom';
import styled from 'styled-components';

function ModalPortal({ children }) {
  const el = document.getElementById('modal');
  return <Background>{ReactDOM.createPortal(children, el)}</Background>;
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

export default ModalPortal;

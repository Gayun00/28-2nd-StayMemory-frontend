import React from 'react';
import styled, { keyframes } from 'styled-components';
// import { KAKAO_AUTH_URL } from './Oauth';

const CLIENT_ID = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/signin_kakao';
const hasToken = sessionStorage.getItem('token');
console.log(hasToken);

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
console.log(KAKAO_AUTH_URL);
function Login() {
  return (
    <Container>
      <div>
        <ContentAnimationBox>
          <TitleContainer>
            <EngTitle>LOGIN</EngTitle>
            <KorTitle>로그인</KorTitle>
          </TitleContainer>
        </ContentAnimationBox>

        <LoginForm>
          <LoginInput placeholder="이메일 아이디" />
          <LoginInput placeholder="비밀번호" />
          {hasToken ? (
            <LoginButton>LOGOUT</LoginButton>
          ) : (
            <LoginButton>LOGIN</LoginButton>
          )}

          <KakaoBtn href={KAKAO_AUTH_URL}>
            <img src="/images/kakaoBtn.png" alt="카카오 로그인 버튼" />
          </KakaoBtn>
        </LoginForm>
      </div>
    </Container>
  );
}

export default Login;

const sayHelloAnimation = keyframes`
  from {
    transform: rotate(-5deg);
  }to{
    transform: rotate(5deg);
  }
`;

const ContentAnimationBox = styled.div`
  animation: ${sayHelloAnimation} 1s linear infinite alternate;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`;

const TitleContainer = styled.div`
  margin-top: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;

const EngTitle = styled(Title)`
  font-size: 25px;
`;

const KorTitle = styled(Title)`
  font-size: 15px;
  color: gray;
`;

const LoginForm = styled.div`
  border-top: 1px solid black;
  margin-top: 40px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  width: 360px;
`;

const LoginInput = styled.input`
  height: 45px;
  border: none;
  border-bottom: 1px solid gray;
`;

const LoginButton = styled.button`
  margin-top: 30px;
  width: 360px;
  height: 55px;
  background-color: black;
  color: white;
`;

const KakaoBtn = styled.a`
  margin-top: 15px;
  img {
    width: 355px;
  }
`;

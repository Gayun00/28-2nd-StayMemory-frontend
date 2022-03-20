import { useNavigate } from 'react-router-dom';

export function useError() {
  const navigate = useNavigate();
  function throwError(response) {
    const error = new Error(response.message);
    switch (response.message) {
      case 'INVALID_TOKEN':
        error.name = 'loginError';
      // no default
    }
    throw error;
  }

  function catchError(error) {
    console.error(error.toString());
    switch (error.name) {
      case 'loginError':
        alert('로그인 화면으로 이동합니다.');
      // no default
    }
    navigate('/login');
  }
  return { throwError, catchError };
}

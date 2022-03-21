import { useError } from './useError';

function useFetch() {
  const loginToken = sessionStorage.getItem('loginToken');
  const { throwError, catchError } = useError();

  async function getRequest(url) {
    const res = await fetch(url);
    const resJson = await res.json();
    const result = resJson.data;
    return result;
  }

  async function getRequestWithAuth(url) {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: loginToken,
      },
    });
    const resJson = await res.json();
    const result = resJson.data;
    return result;
  }

  async function postRequest(url, body) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: loginToken,
        },
        body: body,
      });
      const resJson = await res.json();
      if (!res.ok) {
        throwError(resJson);
      }
    } catch (err) {
      catchError(err);
    }
  }

  return { getRequest, getRequestWithAuth, postRequest };
}

export default useFetch;

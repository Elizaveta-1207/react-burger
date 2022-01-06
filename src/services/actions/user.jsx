import { BASE_API_URL, setCookies, getCookie, retriableFetch } from '../../utils/constants';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED';

const checkResponse = (res) => {
  if (res.ok) return res.json();
  else return res.json().then((err) => Promise.reject(err));
};

export const register = ({ email, password, name, history }) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    fetch(`${BASE_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, name: name }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({ type: REGISTER_SUCCESS });
          history.push('/login');
        } else Promise.reject(res);
      })
      .catch(() => dispatch({ type: REGISTER_FAILED }));
  };
};

export const refresh = () => {
  const refreshToken = getCookie('refreshToken');
  return fetch(`${BASE_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ token: `${refreshToken}` }),
  }).then(checkResponse);
};

export const getUser = () => {
  const accessToken = getCookie('accessToken');
  return (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    retriableFetch(`${BASE_API_URL}/auth/user`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.success) dispatch({ type: GET_USER_SUCCESS, payload: res.user });
        else Promise.reject(res);
      })
      .catch(() => dispatch({ type: GET_USER_FAILED }));
  };
};

export const updateUser = ({ email, password, name }) => {
  const accessToken = getCookie('accessToken');
  return (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    retriableFetch(`${BASE_API_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email: email, password: password, name: name }),
    })
      .then((res) => {
        if (res.success) dispatch({ type: USER_UPDATE_SUCCESS, payload: res.user });
        else Promise.reject(res);
      })
      .catch(() => dispatch({ type: USER_UPDATE_FAILED }));
  };
};

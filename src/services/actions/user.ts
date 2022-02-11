import { BASE_API_URL, setCookies, getCookie, retriableFetch, deleteCookies } from '../../utils/constants';
import { AppThunk, AppDispatch } from '../reducers';
import { TRes, TUser, TRefresh } from '../../utils/types';

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

type TRegisterActionRequest = { readonly type: typeof REGISTER_REQUEST };
type TRegisterActionSuccess = { readonly type: typeof REGISTER_SUCCESS };
type TRegisterActionFailed = { readonly type: typeof REGISTER_FAILED };

type TLoginActionRequest = { readonly type: typeof AUTH_REQUEST };
type TLoginActionSuccess = { readonly type: typeof AUTH_SUCCESS; readonly payload: TUser | undefined };
type TLoginActionFailed = { readonly type: typeof AUTH_FAILED };

type TLogoutActionRequest = { readonly type: typeof LOGOUT_REQUEST };
type TLogoutActionSuccess = { readonly type: typeof LOGOUT_SUCCESS };
type TLogoutActionFailed = { readonly type: typeof LOGOUT_FAILED };

type TGetUserActionRequest = { readonly type: typeof GET_USER_REQUEST };
type TGetUserActionSuccess = { readonly type: typeof GET_USER_SUCCESS; payload: TUser | undefined };
type TGetUserActionFailed = { readonly type: typeof GET_USER_FAILED };

type TUpdateUserActionRequest = { readonly type: typeof USER_UPDATE_REQUEST };
type TUpdateUserActionSuccess = { readonly type: typeof USER_UPDATE_SUCCESS; payload: TUser | undefined };
type TUpdateUserActionFailed = { readonly type: typeof USER_UPDATE_FAILED };

export type TUserActions =
  | TRegisterActionRequest
  | TRegisterActionSuccess
  | TRegisterActionFailed
  | TLoginActionRequest
  | TLoginActionSuccess
  | TLoginActionFailed
  | TLogoutActionRequest
  | TLogoutActionSuccess
  | TLogoutActionFailed
  | TGetUserActionRequest
  | TGetUserActionSuccess
  | TGetUserActionFailed
  | TUpdateUserActionRequest
  | TUpdateUserActionSuccess
  | TUpdateUserActionFailed;

  const loginSuccess = (user: TUser): TLoginActionSuccess => {
	return { type: AUTH_SUCCESS, payload: user };
  };

  const loginFailed = (): TLoginActionFailed => {
	return { type: AUTH_FAILED };
  };


export const register: AppThunk = ({ email, password, name, history }) => {
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
      .then((res) => {
		if (res.ok) return res.json();
		else return res.json().then((err) => Promise.reject(err));
	  })
      .then((res) => {
        if (res.success) {
          dispatch({ type: REGISTER_SUCCESS });
          history.push('/login');
        } else Promise.reject(res);
      })
      .catch(() => dispatch({ type: REGISTER_FAILED }));
  };
};

export const refresh = (): Promise<TRefresh> => {
  const refreshToken = getCookie('refreshToken');
  return fetch(`${BASE_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ token: `${refreshToken}` }),
  }).then((res) => {
	if (res.ok) return res.json();
	else return res.json().then((err) => Promise.reject(err));
  });
};

export const getUser: AppThunk = () => (dispatch: AppDispatch) =>{
  const accessToken = getCookie('accessToken');

    dispatch({ type: GET_USER_REQUEST });
    retriableFetch<TRes>(`${BASE_API_URL}/auth/user`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }}
    )
      .then((res) => {
        if (res.success) dispatch({ type: GET_USER_SUCCESS, payload: res.user });
        else Promise.reject(res);
      })
      .catch(() => dispatch({ type: GET_USER_FAILED }));
  
};

export const updateUser: AppThunk = ({ email, password, name }) => (dispatch: AppDispatch) =>{
  const accessToken = getCookie('accessToken');

    dispatch({ type: USER_UPDATE_REQUEST });
    retriableFetch<TRes>(`${BASE_API_URL}/auth/user`, {
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

export const login: AppThunk = ({ email, password, history }) => (dispatch: AppDispatch) =>{
  
    dispatch({ type: AUTH_REQUEST });
    fetch(`${BASE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
		if (res.ok) return res.json();
		else return res.json().then((err) => Promise.reject(err));
	  })
      .then((res) => {
        if (res.success) {
			const accessToken = res.accessToken.split('Bearer ')[1];
			setCookies('accessToken', accessToken);
			setCookies('refreshToken', res.refreshToken);
			dispatch(loginSuccess(res.user));
			history.push('/');
        } else Promise.reject(res);
      })
      .catch(() => dispatch(loginFailed()));
  };


export const logout : AppThunk = () => (dispatch: AppDispatch) => {
  const refreshToken = getCookie('refreshToken');
    dispatch({ type: LOGOUT_REQUEST });
    fetch(`${BASE_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token: `${refreshToken}` }),
    })
      .then((res) => {
		if (res.ok) return res.json();
		else return res.json().then((err) => Promise.reject(err));
	  })
      .then((res) => {
        if (res.success) {
			deleteCookies('accessToken');
			deleteCookies('refreshToken');
			dispatch({ type: LOGOUT_SUCCESS });
		  } else Promise.reject(res);
      })
      .catch(() => dispatch({ type: LOGOUT_FAILED }));
  };


import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
} from '../actions/user';

import { userReducer } from './user';

describe('user reducer', () => {
  it('user reducer initial state', () => {
    expect(userReducer(undefined, {})).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: null,
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('REGISTER_REQUEST', () => {
    expect(userReducer(undefined, { type: REGISTER_REQUEST })).toEqual({
      registerRequest: true,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: null,
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('REGISTER_SUCCESS', () => {
    expect(userReducer(undefined, { type: REGISTER_SUCCESS })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: '',
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('REGISTER_FAILED', () => {
    expect(userReducer(undefined, { type: REGISTER_FAILED })).toEqual({
      registerRequest: false,
      registerError: true,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: 'Ошибка при регистрации',
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('AUTH_REQUEST', () => {
    expect(userReducer(undefined, { type: AUTH_REQUEST })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: true,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: null,
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('AUTH_SUCCESS', () => {
    expect(
      userReducer(undefined, {
        type: AUTH_SUCCESS,
        payload: { email: 'elizaveta1207@gmail.com', password: '12345' },
      }),
    ).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: '',
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: true,
      user: { email: 'elizaveta1207@gmail.com', password: '12345' },
    });
  });

  it('AUTH_FAILED', () => {
    expect(userReducer(undefined, { type: AUTH_FAILED })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: true,
      logoutRequest: false,
      logoutError: false,
      errorText: 'Ошибка при авторизации',
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('LOGOUT_REQUEST', () => {
    expect(userReducer(undefined, { type: LOGOUT_REQUEST })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: true,
      logoutError: false,
      errorText: null,
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('LOGOUT_SUCCESS', () => {
    expect(userReducer(undefined, { type: LOGOUT_SUCCESS })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: '',
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('LOGOUT_FAILED', () => {
    expect(userReducer(undefined, { type: LOGOUT_FAILED })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: true,
      errorText: 'Ошибка при выходе пользователя',
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('GET_USER_REQUEST', () => {
    expect(userReducer(undefined, { type: GET_USER_REQUEST })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: null,
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('GET_USER_SUCCESS', () => {
    expect(
      userReducer(undefined, {
        type: GET_USER_SUCCESS,
        payload: { email: 'elizaveta1207@gmail.com', name: 'Liza' },
      }),
    ).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: '',
      getUserRequest: false,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: true,
      user: { email: 'elizaveta1207@gmail.com', name: 'Liza' },
    });
  });

  it('GET_USER_FAILED', () => {
    expect(userReducer(undefined, { type: GET_USER_FAILED })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: 'Ошибка при получении данных пользователя',
      getUserRequest: false,
      getUserError: true,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('USER_UPDATE_REQUEST', () => {
    expect(userReducer(undefined, { type: USER_UPDATE_REQUEST })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: null,
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: true,
      userUpdateError: false,
      isAuth: false,
      user: null,
    });
  });

  it('USER_UPDATE_SUCCESS', () => {
    expect(
      userReducer(undefined, {
        type: USER_UPDATE_SUCCESS,
        payload: { email: 'elizaveta1207@gmail.com', name: 'Liza' },
      }),
    ).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: '',
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: false,
      isAuth: false,
      user: { email: 'elizaveta1207@gmail.com', name: 'Liza' },
    });
  });

  it('USER_UPDATE_FAILED', () => {
    expect(userReducer(undefined, { type: USER_UPDATE_FAILED })).toEqual({
      registerRequest: false,
      registerError: false,
      authRequest: false,
      authError: false,
      logoutRequest: false,
      logoutError: false,
      errorText: 'Ошибка при обновлении данных пользователя',
      getUserRequest: true,
      getUserError: false,
      getUserLoaded: false,
      userUpdateRequest: false,
      userUpdateError: true,
      isAuth: false,
      user: null,
    });
  });
});

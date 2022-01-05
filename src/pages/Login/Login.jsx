import React from 'react';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import {
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import login from './Login.module.css';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChange = (e) => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : setPassword(target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: email, password: password, history: history }));
  };
  return (
    <div className={login.block}>
      <form onSubmit={onSubmit} noValidate className={login.form}>
        <h2 className='text text_type_main-medium'>Вход</h2>
        <EmailInput name='email' value={email || ''} onChange={onChange} />
        <PasswordInput name='password' value={password || ''} onChange={onChange} />
        <Button type='primary' size='medium' disabled={!email || !password}>
          Войти
        </Button>
      </form>
      <div className={`${login.info}`}>
        <div className='text text_type_main-default text_color_inactive mb-4'>
          <span>Вы — новый пользователь?</span>
          <Link to='/register' className={`${login.link} ml-2`}>
            Зарегистрироваться
          </Link>
        </div>
        <div className='text text_type_main-default text_color_inactive'>
          <span>Забыли пароль?</span>
          <Link to='/forgot-password' className={`${login.link} ml-2`}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

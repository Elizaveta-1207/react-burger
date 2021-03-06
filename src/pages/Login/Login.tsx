import React, { ChangeEvent, FormEvent } from 'react';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import {
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import loginStyle from './Login.module.css';
import { login } from '../../services/actions/user';
import { RootState } from '../../services/reducers';
import { TAuthType } from '../../utils/types';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();
  const { isAuth, getUserRequest } = useSelector((state) => state.user);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : setPassword(target.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: email, password: password, history: history }));
  };

  //   if (getUserRequest) return null;
  if (getUserRequest && isAuth)
    return <Redirect to={{ pathname: (location as any).state?.from ?? '/profile' }} />;

  return (
    <div className={loginStyle.block}>
      <form onSubmit={onSubmit} noValidate className={loginStyle.form}>
        <h2 className='text text_type_main-medium'>Вход</h2>
        <EmailInput name='email' value={email || ''} onChange={onChange} />
        <PasswordInput name='password' value={password || ''} onChange={onChange} />
        <Button type='primary' size='medium' disabled={!email || !password}>
          Войти
        </Button>
      </form>
      <div className={`${loginStyle.info}`}>
        <div className='text text_type_main-default text_color_inactive mb-4'>
          <span>Вы — новый пользователь?</span>
          <Link to='/register' className={`${loginStyle.link} ml-2`}>
            Зарегистрироваться
          </Link>
        </div>
        <div className='text text_type_main-default text_color_inactive'>
          <span>Забыли пароль?</span>
          <Link to='/forgot-password' className={`${loginStyle.link} ml-2`}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

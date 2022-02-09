import React, { ChangeEvent, FormEvent } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import registerStyle from './Register.module.css';
import { register } from '../../services/actions/user';
import { emailRegex } from '../../utils/constants';
import { RootState } from '../../services/reducers';
import { TAuthType } from '../../utils/types';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();
  const { user, isAuth, getUserRequest, errorText, registerError } = useSelector(
    (state) => state.user,
  );

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  //   const errorText = 'Некорректный email';

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target.name === 'email'
      ? setEmail(target.value)
      : target.name === 'username'
      ? setUsername(target.value)
      : setPassword(target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ email: email, name: username, password: password, history: history }));
  };

  React.useEffect(
    () =>
      email.length > 0 && !email.match(emailRegex) ? setEmailError(true) : setEmailError(false),
    [email],
  );

  if (getUserRequest) return null;
  else if (!getUserRequest && isAuth) return <Redirect to={location.state?.from || '/profile'} />;

  return (
    <div className={registerStyle.block}>
      <form onSubmit={onSubmit} noValidate className={registerStyle.form}>
        <h2 className='text text_type_main-medium'>Регистрация</h2>
        <Input
          type='text'
          placeholder='Имя'
          name='username'
          value={username || ''}
          onChange={onChange}
        />
        <Input
          type='email'
          placeholder='E-mail'
          name='email'
          value={email || ''}
          onChange={onChange}
          error={emailError}
          errorText={'Некорректный email'}
        />
        <PasswordInput name='password' value={password || ''} onChange={onChange} />
        <Button
          type='primary'
          size='medium'
          disabled={!email || emailError || !password || !username || registerError}
        >
          Вход
        </Button>
        <p className='text text_type_main-small mt-2' style={{ color: 'red' }}>
          {errorText === 'Ошибка при регистрации' && errorText}
        </p>
      </form>
      <div className={registerStyle.info}>
        <div className='text text_type_main-default text_color_inactive'>
          <span>Уже зарегистрированы?</span>
          <Link to='/login' className={`${registerStyle.link} ml-2`}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

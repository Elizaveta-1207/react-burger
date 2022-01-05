import React from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import register from './Register.module.css';

function Register() {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const errorText = 'Некорректный email';

  const onChange = (e) => {
    const target = e.target;
    target.name === 'email'
      ? setEmail(target.value)
      : target.name === 'username'
      ? setUsername(target.value)
      : setPassword(target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email: email, name: username, password: password, history: history }));
  };

  return (
    <div className={register.block}>
      <form onSubmit={onSubmit} noValidate className={register.form}>
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
          errorText={errorText}
        />
        <PasswordInput name='password' value={password || ''} onChange={onChange} />
        <Button type='primary' size='medium' disabled>
          Вход
        </Button>
      </form>
      <div className={register.info}>
        <div className='text text_type_main-default text_color_inactive'>
          <span>Уже зарегистрированы?</span>
          <Link to='/login' className={`${register.link} ml-2`}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

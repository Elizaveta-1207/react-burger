import React from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import forgotPassword from './ForgotPassword.module.css';

function ForgotPassword() {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const errorText = 'Некорректный email';

  const onChange = (e) => {
    const target = e.target;
    target.name === 'email' && setEmail(target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(123);
  };

  return (
    <div className={forgotPassword.block}>
      <form onSubmit={onSubmit} noValidate className={forgotPassword.form}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <Input
          type='email'
          placeholder='Укажите e-mail'
          name='email'
          value={email || ''}
          onChange={onChange}
          error={emailError}
          errorText={errorText}
        />
        <Button type='primary' size='medium' disabled={!email || emailError}>
          Восстановить
        </Button>
      </form>
      <div className={forgotPassword.info}>
        <div className='text text_type_main-default text_color_inactive'>
          <span>Вспомнили пароль?</span>
          <Link to='/login' className={`${forgotPassword.link} ml-2`}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

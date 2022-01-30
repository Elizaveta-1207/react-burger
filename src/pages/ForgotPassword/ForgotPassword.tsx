import React, { ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPassword from './ForgotPassword.module.css';
import { BASE_API_URL } from '../../utils/constants';

function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const errorText = 'Некорректный email';

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target.name === 'email' && setEmail(target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${BASE_API_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else setEmailError(true);
      })
      .then((res) => {
        if (res.success) history.replace('/reset-password', { forgotPageVisited: true });
        else setEmailError(true);
      })
      .catch(() => setEmailError(true));
  };

  console.log(!email);

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

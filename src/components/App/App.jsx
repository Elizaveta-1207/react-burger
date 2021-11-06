import React from 'react';
// import logo from '../../logo.svg';
import app from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import data from '../../utils/data.json';

function App() {
  return (
    <>
      <AppHeader />
      <main className={`${app.main} pl-4 pr-4 mb-10`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
}

export default App;

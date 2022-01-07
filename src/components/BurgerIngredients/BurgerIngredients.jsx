import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './BurgerIngredients.module.css';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';

function BurgerIngredients({ onModalOpen }) {
  const data = useSelector((state) => state.burgerIngredients.ingredients);

  const [currentTab, setCurrentTab] = useState('bun');

  const tabsRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainRef = useRef();

  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const main = data.filter((item) => item.type === 'main');

  const getTab = () => {
    // верх табов
    const tabsTop = tabsRef.current.getBoundingClientRect().top;

    // расстояние от верхушки табов до верхушки каждого блока с ингридиентами
    const bunsDistance = Math.abs(tabsTop - bunsRef.current.getBoundingClientRect().top);
    const saucesDistance = Math.abs(tabsTop - saucesRef.current.getBoundingClientRect().top);
    const mainDistance = Math.abs(tabsTop - mainRef.current.getBoundingClientRect().top);

    // минимальное расстояние от верхушки табов до блока с ингридиентами
    const minValue = Math.min(bunsDistance, saucesDistance, mainDistance);

    if (minValue === bunsDistance) {
      setCurrentTab('bun');
    } else if (minValue === saucesDistance) {
      setCurrentTab('sauce');
    } else {
      setCurrentTab('main');
    }
  };

  // реализация скролла при нажатии на таб
  const handleTabClick = (currentTab) => {
    setCurrentTab(currentTab);
    currentTab === 'bun' && bunsRef.current.scrollIntoView({ behavior: 'smooth' });
    currentTab === 'sauce' && saucesRef.current.scrollIntoView({ behavior: 'smooth' });
    currentTab === 'main' && mainRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // массив видов ингридиентов
  const typeArr = [
    { title: 'Булки', ingredients: buns, refName: bunsRef },
    { title: 'Соусы', ingredients: sauces, refName: saucesRef },
    { title: 'Начинки', ingredients: main, refName: mainRef },
  ];

  return (
    <div className={`${burgerIngredients.container} mr-10`}>
      <p className={`${burgerIngredients.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </p>
      <nav className={`${burgerIngredients.nav}`} ref={tabsRef}>
        <Tab value='bun' active={currentTab === 'bun'} onClick={() => handleTabClick('bun')}>
          Булки
        </Tab>
        <Tab value='sauce' active={currentTab === 'sauce'} onClick={() => handleTabClick('sauce')}>
          Соусы
        </Tab>
        <Tab value='main' active={currentTab === 'main'} onClick={() => handleTabClick('main')}>
          Начинки
        </Tab>
      </nav>
      <div className={`${burgerIngredients.ingredientsBlock} mt-10`} onScroll={getTab}>
        {typeArr.map((item, i) => (
          <div ref={item.refName} key={i}>
            <IngredientsContainer
              title={item.title}
              ingredients={item.ingredients}
              onModalOpen={onModalOpen}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
BurgerIngredients.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};

export default BurgerIngredients;

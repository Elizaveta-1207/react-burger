import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './BurgerIngredients.module.css';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';
import { RootState } from '../../services/reducers';
import { TBurgerIngredientsType } from '../../utils/types';



function BurgerIngredients() {
  const data = useSelector(
    (state: Omit<RootState, 'burgerIngredients'> & { burgerIngredients: TBurgerIngredientsType }) => state.burgerIngredients.ingredients
  );

  const [currentTab, setCurrentTab] = useState('bun');

  const tabsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const main = data.filter((item) => item.type === 'main');

  const getTab = () => {
    // верх табов
    const tabsTop = tabsRef.current?.getBoundingClientRect().top??0;

    // каждый блок верх
    const bunsTop=bunsRef.current?.getBoundingClientRect().top??0;
const saucesTop=saucesRef.current?.getBoundingClientRect().top??0;
const mainTop=mainRef.current?.getBoundingClientRect().top??0;
    // расстояние от верхушки табов до верхушки каждого блока с ингридиентами
    const bunsDistance = Math.abs(tabsTop - bunsTop);
    const saucesDistance = Math.abs(tabsTop - saucesTop);
    const mainDistance = Math.abs(tabsTop - mainTop);

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
  const handleTabClick = (currentTab:string) => {
    setCurrentTab(currentTab);
    currentTab === 'bun' && bunsRef.current?.scrollIntoView({ behavior: 'smooth' });
    currentTab === 'sauce' && saucesRef.current?.scrollIntoView({ behavior: 'smooth' });
    currentTab === 'main' && mainRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      <div className={`${burgerIngredients.nav}`} ref={tabsRef}>
        <Tab value='bun' active={currentTab === 'bun'} onClick={() => handleTabClick('bun')}>
          Булки
        </Tab>
        <Tab value='sauce' active={currentTab === 'sauce'} onClick={() => handleTabClick('sauce')}>
          Соусы
        </Tab>
        <Tab value='main' active={currentTab === 'main'} onClick={() => handleTabClick('main')}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredients.ingredientsBlock} mt-10`} onScroll={getTab}>
        {typeArr.map((item, i) => (
          <div ref={item.refName} key={i}>
            <IngredientsContainer
              title={item.title}
              ingredients={item.ingredients}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BurgerIngredients;

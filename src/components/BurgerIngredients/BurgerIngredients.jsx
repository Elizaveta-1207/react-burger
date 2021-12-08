import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './BurgerIngredients.module.css';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';

function BurgerIngredients({ onModalOpen, getModalType, getIngredients }) {
  const data = useSelector((state) => state.burgerIngredients.ingredients);
  //   console.log(data);

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
    console.log(currentTab);
    currentTab === 'bun' && bunsRef.current.scrollIntoView({ behavior: 'smooth' });
    currentTab === 'sauce' && saucesRef.current.scrollIntoView({ behavior: 'smooth' });
    currentTab === 'main' && mainRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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
        <div ref={bunsRef}>
          <IngredientsContainer
            title='Булки'
            ingredients={buns}
            onModalOpen={onModalOpen}
            //   getIngredients={getIngredients}
            getModalType={getModalType}
          />
        </div>
        <div ref={saucesRef}>
          <IngredientsContainer
            title='Соусы'
            ingredients={sauces}
            onModalOpen={onModalOpen}
            //   getIngredients={getIngredients}
            getModalType={getModalType}
          />
        </div>
        <div ref={mainRef}>
          <IngredientsContainer
            title='Начинки'
            ingredients={main}
            onModalOpen={onModalOpen}
            //   getIngredients={getIngredients}
            getModalType={getModalType}
          />
        </div>
      </div>
    </div>
  );
}
BurgerIngredients.propTypes = {
  //   data: PropTypes.array.isRequired,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  type: PropTypes.string,
  _id: PropTypes.string,
  _v: PropTypes.number,
};

export default BurgerIngredients;

import React, { ChangeEvent } from 'react';

import PropTypes from 'prop-types';

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
});


export type TAuthType = {
  registerRequest: boolean;
  registerError: boolean;
  authRequest: boolean;
  authError: boolean;
  logoutRequest: boolean;
  logoutError: boolean;
  errorText: string | null;
  getUserRequest: boolean;
  getUserError: boolean;
  getUserLoaded: boolean;
  userUpdateRequest: boolean;
  userUpdateError: boolean;
  isAuth: boolean;
  user: any;
};

export type TIngredientType = {
  _id: string;
  name: string;
  type: string;
  image?: string;
  image_large?: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  key?: string;
};

export type TBurgerIngredientsType = {
  ingredients: Array<TIngredientType> | [];
  isIngredientsLoading: boolean;
  isIngredientsGetFailed: boolean;
  isIngredientsLoaded: boolean;
};

export type TBurgerConstructorType = {
  constructorBuns: TIngredientType | null;
  constructorIngredients: Array<TIngredientType> | [];
  constructorCount: number;
};

export type TOrderDetailsProps = {
	orderNumber: number | null;
	isOrderLoading: boolean;
	isOrderGetFailed: boolean;
  };
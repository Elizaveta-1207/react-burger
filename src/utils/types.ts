import React from 'react';


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
  image_mobile?: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  key?: number;
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

  export type TUser = { email: string; name: string };
  
  export type TRes = {
	success: boolean;
	user?: TUser;
	order?: any;
  };

  export type TRefresh = {
	success: boolean;
	accessToken?: string ;
	refreshToken?: string ;
	message?: string;
  };

  export type TOrder = {
	createdAt: string;
	ingredients: Array<string>;
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	_id: string;
  };
  
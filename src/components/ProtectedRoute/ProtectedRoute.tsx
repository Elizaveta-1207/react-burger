import React, {FC} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { TAuthType } from '../../utils/types';

type TProtectedRouteProps = {
  path: string;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) => {
  const { isAuth, getUserRequest } = useSelector((state: Omit<RootState, 'user'> & { user: TAuthType }) => state.user);

  if (getUserRequest) return null;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
};

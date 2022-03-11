import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import store from '../../app/store';
import { loadUser } from '../auth/userSlice';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  let isAuthenticated = false;

  const authenticateUser = async () => {
    const action = loadUser();
    await dispatch(action);
    const isAuthenticatedState = store.getState().user.isAuthenticated;
    return isAuthenticatedState;
  };

  isAuthenticated = (async () => await authenticateUser());
 
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated? (
          <>
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to='/login' />
        )
      }
    ></Route>
  );
};

export default ProtectedRoute;

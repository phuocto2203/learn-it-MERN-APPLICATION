import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import store from '../app/store';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { loadUser } from '../components/auth/userSlice';
const Auth = ({ authRoute }) => {
  let [body, setBody] = useState();

  const history = useHistory(); //router

  const dispatch = useDispatch();

  body = (
    <>
      {authRoute === 'login' && <LoginForm />}
      {authRoute === 'register' && <RegisterForm />}
    </>
  );
  useEffect(() => {
    const authenticateUser = async () => {
      const action = loadUser();
      await dispatch(action);
      const { isAuthenticated } = store.getState().user;

      if (isAuthenticated) {
        history.push('./dashboard');
      }
      setBody(
        <>
          {authRoute === 'login' && <LoginForm />}
          {authRoute === 'register' && <RegisterForm />}
        </>
      );
      // console.log(isAuthenticated);
    };
    authenticateUser();
    return () => {
      setBody(null);
    };
  }, [store.getState().user]);

  return (
    <>
      <div className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1>Learn it</h1>
            <h4>Keep track of what you are learning</h4>
            {body}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

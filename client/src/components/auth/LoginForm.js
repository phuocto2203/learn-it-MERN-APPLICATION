import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from './userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const schema = Yup.object().shape({
  username: Yup.string().required('Please enter your username'),
  password: Yup.string().required('Please enter your password'),
});
const LoginForm = () => {
  const [loginError, setLoginError] = useState('');

  //Router
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    // console.log(values)
    const action = login(values);
    const resultAction = await dispatch(action);
    const userData = unwrapResult(resultAction);

    if (userData.success) {
      history.push('/dashboard');
    } else {
      setLoginError(userData.message);
    }
  };
  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        initialValues={{
          username: '',
          password: '',
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className='mt-4'>
            <Form.Group>
              <InputGroup hasValidation>
                <Form.Control
                  className='mb-3'
                  type='text'
                  placeholder='username'
                  name='username'
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup hasValidation>
                <Form.Control
                  className='mb-3'
                  type='password'
                  placeholder='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <p style={{ color: 'red' }}>{loginError}</p>

            <Button className='mb-3' variant='success' type='submit'>
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account?
        <Link to='/register'>
          <Button variant='info' size='sm' className='ms-2'>
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;

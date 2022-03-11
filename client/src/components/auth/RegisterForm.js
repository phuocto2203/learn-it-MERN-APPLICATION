import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputGroup from 'react-bootstrap/InputGroup';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { register } from './userSlice';

const schema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too short! Minimum length is 4 characters!')
    .max(50, 'Too long! Maximum length is 50 characters')
    .required(),
  password: Yup.string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    )
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password!'),
});

const RegisterForm = () => {
  const [registerError, setRegisterError] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = async (values, { resetForm }) => {
    const action = register(values);
    const resultAction = await dispatch(action);
    const userData = unwrapResult(resultAction);
    if (userData.success) {
      history.push('/dashboard');
    } else {
      setRegisterError(userData.message);
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
          confirmPassword: '',
        }}
      >
        {({ handleSubmit, handleChange, errors, values }) => (
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

            <Form.Group>
              <InputGroup hasValidation>
                <Form.Control
                  className='mb-3'
                  type='password'
                  placeholder='confirm password'
                  name='confirmPassword'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <p style={{ color: 'red' }}>{registerError}</p>

            <Button className='mb-3' variant='success' type='submit'>
              Register
            </Button>
          </Form>
        )}
      </Formik>

      <p>
        Already have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ms-2'>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;

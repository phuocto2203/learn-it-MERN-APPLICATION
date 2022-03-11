import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import apiUrl from '../../constant/apiUrl';
import StorageKeys from '../../constant/storage-keys';
import setAuthToken from '../../utils/setAuthToken';
import { setToastMessage } from '../toast/toastSlice';
import { setPostsUpdated, setShowCreateModal } from './modalSlice';

const schema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  url: Yup.string(),
  status: Yup.string(),
});
const CreatePostModal = () => {
  let showModal = useSelector((state) => state.modal.showCreatePostModal);

  const handleSubmit = async (values) => {
    if (localStorage.getItem(StorageKeys.TOKEN)) {
      setAuthToken(localStorage.getItem(StorageKeys.TOKEN));
    }
    try {
      const createPost = await axios.post(`${apiUrl}/posts`, values);

      //close modal after finish
      showModal = false;
      const action = setShowCreateModal(showModal);
      dispatch(action);

      //show successful toast
      const showToastAction = setToastMessage(createPost.data.message);
      dispatch(showToastAction);

      //to update posts on dashboard
      dispatch(setPostsUpdated(true));
    } catch (error) {
      //show toast
      const showToastAction = setToastMessage(error);
      dispatch(showToastAction);
    }
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    showModal = false;
    const action = setShowCreateModal(showModal);
    dispatch(action);
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        initialValues={{
          title: '',
          description: '',
          url: '',
          status: '',
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id='title'
                    value={values.title}
                    type='text'
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.title}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id='description'
                    as='textarea'
                    rows={3}
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.description}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-5'>
                <Form.Label>Link</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id='url'
                    type='text'
                    value={values.url}
                    onChange={handleChange}
                    isInvalid={!!errors.url}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.url}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-5'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '465px',
                    height: '38px',
                    border: '0.5px solid gray',
                    borderRadius: '5px',
                  }}
                >
                  <select
                    id='status'
                    style={{
                      border: 'none',
                      width: '455px',
                      outline: 'none',
                    }}
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option>GOING TO LEARN</option>
                    <option>LEARNING</option>
                    <option>LEARNED</option>
                  </select>
                </div>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='success' type='submit'>
                Save changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreatePostModal;

import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import apiUrl from '../../constant/apiUrl';
import StorageKeys from '../../constant/storage-keys';
import setAuthToken from '../../utils/setAuthToken';
import { setToastMessage } from '../toast/toastSlice';
import { clearPostId, setPostsUpdated, setShowEditModal } from './modalSlice';

const schema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  url: Yup.string(),
  status: Yup.string(),
});
const EditPostModal = () => {
  let showModal = useSelector((state) => state.modal.showEditPostModal);
  let postID = useSelector((state) => state.modal.postID);

  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts/get/${postID}`);
        setPostDetail(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log(values);
    if (localStorage.getItem(StorageKeys.TOKEN)) {
      setAuthToken(localStorage.getItem(StorageKeys.TOKEN));
    }
    try {
      const editPost = await axios.put(`${apiUrl}/posts/${postID}`, values);
      console.log(editPost);

      //clear post Id
      const emptyPostId = clearPostId();
      dispatch(emptyPostId);

      //close modal after finish
      showModal = false;
      const action = setShowEditModal(showModal);
      dispatch(action);

      //to update posts on dashboard
      dispatch(setPostsUpdated(true));

      //show successful toast
      const showToastAction = setToastMessage(editPost.data.message);
      dispatch(showToastAction);

    } catch (error) {
      //show error toast
      const showToastAction = setToastMessage(error);
      dispatch(showToastAction);
    }
  };


  const handleClose = () => {
    //clear post Id
    const emptyPostId = clearPostId();
    dispatch(emptyPostId);

    //close modal
    showModal = false;
    const action = setShowEditModal(showModal);
    dispatch(action);
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        enableReinitialize={true}
        initialValues={{
          title: postDetail.title,
          description: postDetail.description,
          url: postDetail.url,
          status: postDetail.status,
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Making progress? Edit?</Modal.Title>
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

export default EditPostModal;

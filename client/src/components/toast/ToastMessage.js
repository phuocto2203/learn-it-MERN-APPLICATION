import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideToastMessage } from './toastSlice';
const ToastMessage = () => {
  //get toast setting from redux state
  let show = useSelector((state) => state.toast.show);
  let message = useSelector((state) => state.toast.message);

  let dispatch = useDispatch();

  const handleClose = () => {
    //hide toast
    dispatch(hideToastMessage());
  };
  return (
    <>
      <ToastContainer position='top-end' className='p-3'>
        <Toast delay={5000} autohide show={show} onClose={handleClose}>
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Notification</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ToastMessage;

import React from 'react';
import { Card } from 'react-bootstrap';
import { BiEdit, BiFilm, BiTrash } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setShowEditModal,
  savePostId,
  setPostsUpdated,
} from '../modal/modalSlice';
import axios from 'axios';
import apiUrl from '../../constant/apiUrl';
import setAuthToken from '../../utils/setAuthToken';
import StorageKeys from '../../constant/storage-keys';
import { setToastMessage } from '../toast/toastSlice';

const PostCard = ({ post }) => {
  const { _id, title, description, url, status } = post;
  //get modal setting from state
  let showEditPostModal = useSelector((state) => state.modal.showEditPostModal);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    //save post id to match on db for updating post
    const savePostIdAction = savePostId(_id);
    dispatch(savePostIdAction);

    //show edit modal
    showEditPostModal = true;
    const showEditModal = setShowEditModal(showEditPostModal);
    dispatch(showEditModal);
  };

  const handleDeletePost = async () => {
    if (localStorage.getItem(StorageKeys.TOKEN)) {
      setAuthToken(localStorage.getItem(StorageKeys.TOKEN));
    }
    try {
      const deletePost = await axios.delete(`${apiUrl}/posts/${_id}`);
      console.log(deletePost.data);

      dispatch(setPostsUpdated(true));

      //show successful toast
      const showToastAction = setToastMessage(deletePost.data.message);
      dispatch(showToastAction);
    } catch (error) {
      //show error toast
      const showToastAction = setToastMessage(error);
      dispatch(showToastAction);
    }
  };

  return (
    <Card className='mt-5' style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '2rem',
          }}
        >
          <h1 className='post-title'>{title}</h1>
          <div
            className='post-tools'
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '20px',
            }}
          >
            <div className='post-link'>
              <a href={`${url}`} style={{ color: 'inherit' }}>
                <BiFilm />
              </a>
            </div>
            <div
              className='post-edit'
              style={{ color: 'inherit', cursor: 'pointer' }}
            >
              <BiEdit onClick={handleShowModal} />
            </div>
            <div
              className='post-delete'
              style={{ color: 'inherit', cursor: 'pointer' }}
              onClick={handleDeletePost}
            >
              <BiTrash />
            </div>
          </div>
        </Card.Title>
        <div
          className='mb-3'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '30px',
            backgroundColor: '#F48FB1',
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            borderRadius: '15px',
          }}
        >
          {status}
        </div>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PostCard;

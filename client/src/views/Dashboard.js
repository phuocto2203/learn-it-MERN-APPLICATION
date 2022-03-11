import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Toast from '../components/toast/ToastMessage';
import { RiAddCircleFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/card/PostCard';
import WelcomeCard from '../components/card/WelcomeCard';
import CreatePostModal from '../components/modal/CreatePostModal';
import EditPostModal from '../components/modal/EditPostModal';
import {
  clearPostId,
  setShowCreateModal,
  setShowEditModal,
  setPostsUpdated,
} from '../components/modal/modalSlice';
import Navigationbar from '../components/navbar/Navigationbar';
import apiUrl from '../constant/apiUrl';
import StorageKeys from '../constant/storage-keys';
import setAuthToken from '../utils/setAuthToken';
const Dashboard = () => {
  const [postList, setPostList] = useState([]);

  //get modal setting from redux state
  let showCreatePostModal = useSelector(
    (state) => state.modal.showCreatePostModal
  );
  let showEditPostModal = useSelector((state) => state.modal.showEditPostModal);

  //check if there is any update on posts on dashboard
  let isPostsUpdated = useSelector((state) => state.modal.isPostsUpdated);

  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      if (localStorage.getItem(StorageKeys.TOKEN)) {
        setAuthToken(localStorage.getItem(StorageKeys.TOKEN));
      }
      try {
        const response = await axios.get(`${apiUrl}/posts`);
        const posts = response.data.posts;
        setPostList(posts);

        //after finishing to update post on dashboard, set it back to false
        dispatch(setPostsUpdated(false));
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [isPostsUpdated]);


  const handleShowCreateModal = () => {
    //show modal
    const action = setShowCreateModal(true);
    dispatch(action);
  };

  const handleClose = () => {
    //clear post Id
    const emptyPostId = clearPostId();
    dispatch(emptyPostId);

    showCreatePostModal = false;
    const closeCreateModal = setShowCreateModal(showCreatePostModal);
    dispatch(closeCreateModal);

    showEditPostModal = false;
    const closeEditModal = setShowEditModal(showEditPostModal);
    dispatch(closeEditModal);
  };

  return (
    <div className='dashboard'>
      <Navigationbar />

      <div className='dashboard_content' style={{ margin: '0 90px 50px 90px' }}>
        {/* toast message */}
        <Toast />

        {/* if there are posts => show post cards otherwise show welcome card */}
        {postList.length > 0 ? (
          <div
            className='dashboard_post-card'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            {postList.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
          </div>
        ) : (
          <div
            className='dashboard_welcome-card'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <WelcomeCard />
          </div>
        )}
      </div>
      <Modal
        show={showCreatePostModal || showEditPostModal}
        onHide={handleClose}
      >
        {showCreatePostModal && <CreatePostModal />}
        {showEditPostModal && <EditPostModal />}
      </Modal>
      <div
        className='add-post button'
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          cursor: 'pointer',
        }}
        onClick={handleShowCreateModal}
      >
        <RiAddCircleFill style={{ fontSize: '50px' }} />
      </div>
    </div>
  );
};

export default Dashboard;

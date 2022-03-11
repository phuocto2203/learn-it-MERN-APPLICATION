import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PostModal from '../modal/CreatePostModal';
import { setShowCreateModal } from '../modal/modalSlice';
const WelcomeCard = () => {
  //get username from state
  const username = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleShowModal = () => {
    //show modal
    const action = setShowCreateModal(true);
    dispatch(action);
  };

  return (
    <>
      <Card
        border='light'
        style={{
          width: '90vw',
          marginTop: '50px',
        }}
      >
        <Card.Header
          style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}
        >
          Hello, {username}!
        </Card.Header>
        <Card.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card.Title>Welcome to Learn it!</Card.Title>
          <Card.Text>
            Click button bellow to track your first skill to learn
          </Card.Text>
          <Button onClick={handleShowModal}>Learn it</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default WelcomeCard;

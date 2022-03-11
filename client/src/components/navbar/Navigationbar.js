import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../auth/userSlice';

const Navigationbar = () => {
  const username = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = async () => {
    const action = logout();
    await dispatch(action);

    //prevent back button working after logging out
    window.addEventListener('popstate', () => {
      history.go(1);
    });

    //push to login page after logout 
    history.push('/login');
  };

  return (
    <>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand> {`</>`} Learn it</Navbar.Brand>
          <Nav className='me-auto'>
            <Link
              to='/dashboard'
              style={{
                textDecoration: 'none',
                color: 'white',
                marginRight: '15px',
              }}
            >
              Dashboard
            </Link>
            <Link
              to='/about'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              About
            </Link>
          </Nav>
          <Nav>
            <NavDropdown title={username}>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;

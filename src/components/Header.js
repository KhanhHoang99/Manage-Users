import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { Outlet, NavLink } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux'
import { handleLogOut } from '../redux/slice/userSlice';
import { Button } from 'react-bootstrap';

function Header() {

  const { logOut, user } = useContext(UserContext);

  const {auth, email} =  useSelector((state) => state.users);

  const dispatch = useDispatch();

  //let token = localStorage.getItem('token');

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink to='/' className='navbar-brand'>
              <img
                src={logoApp}
                width='30'
                height='30'
                className='d-inline-block align-top'
                alt='logo'
                style={{marginRight: "5px"}}
              />
              <span>
                Khanh's App
              </span>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className='nav-link'>Home</NavLink>           
              <NavLink to="/users" className='nav-link'>Manage Users</NavLink>  
            </Nav>
            {
              auth && 
              <Nav className='me-2 mb-2'>
                <b> welcome to user {email}</b>
              </Nav>
            }
            <Nav>
              {
                 //(auth || token)
                 auth
                ?
                <NavDropdown.Item  className='dropdown-item text-center' onClick={() => dispatch(handleLogOut())}>
                  <Button variant="primary">Logout</Button>
                </NavDropdown.Item>  
                :
                <NavLink to="/login" className='dropdown-item text-center'>
                  <Button variant="primary">LogIn</Button>
                </NavLink>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

export default Header;
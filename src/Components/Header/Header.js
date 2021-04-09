import React, { useContext } from 'react';
import {Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
      <div className = "header">
      <nav>
          <Link style={{textDecoration: 'none',color:'white',marginRight:'20px', padding:'5px'}} to="">CITY RIDERS</Link>
          <Link style={{textDecoration: 'none',color:'white',marginRight:'20px', padding:'5px'}} to="/home">Home</Link>
          <Link style={{textDecoration: 'none',color:'white',marginRight:'20px', padding:'5px'}} to="/destination">Destination</Link>
          <Button onClick={() =>setLoggedInUser({})} variant="warning">Sign Out { loggedInUser.email } </Button>
          </nav>
  </div>
    
    );
};

export default Header;


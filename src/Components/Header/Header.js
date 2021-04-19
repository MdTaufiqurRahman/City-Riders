import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

  var style = {
    textDecoration: 'none',   
    color:'white',
    marginRight:'20px', 
    padding:'5px'
  }

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
      <div className = "header">
      <nav>
          <Link style={style} to="">CITY RIDERS</Link>
          <Link style={style} to="/home">Home</Link>
          <Link style={style} to="/destination">Destination</Link>
          <Link style={{textDecoration: 'none',color:'black',marginLeft:'40px', padding:'5px'}} to=" "> { loggedInUser.name }</Link>
          </nav>
  </div>
    
    );
};

export default Header;


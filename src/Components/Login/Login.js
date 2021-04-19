import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { Container } from "react-bootstrap";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {

    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email
        }
        setUser(signInUser);
        setLoggedInUser(signInUser);
        history.replace(from);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        error: '',
        success: false
      }
      setUser(signOutUser);
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const handleBlur = (e) => {
    let isFormVaild = true;
    if (e.target.name === 'email') {
      isFormVaild = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormVaild = isPasswordValid && passwordHasNumber
    }
    if (isFormVaild) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.name && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {

    }).catch(function (error) {
      console.log(error);
    });
  }

  const fbHandleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        const {displayName, email} = result.user;
        const signedInUser = {name: displayName, email:email}
        var accessToken = credential.accessToken;
        console.log(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
         <Container>
    <div style={{
        left: '50%',
        top: '50%',
        position: 'absolute',
        transform : 'translate(-50%, 20%)',
        backgroundColor: 'LightYellow',
        padding:'40px',
        borderRadius:'5px',
        width:'40%'
        

    }}>
      <h4>Login Form</h4>
      <input  type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser"> New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input  style={{
                            backgroundColor:'white',
                            color:'black',
                            borderRadius:'5px',
                            border:'1px solid gray',
                            padding:'5px',
                            width:'100%',
                            marginTop:'5px'
                            }}
        name="name" type="text" onBlur={handleBlur} placeholder="Your Name" required />}
        <br />
        <input style={{
                            backgroundColor:'white',
                            color:'black',
                            borderRadius:'5px',
                            border:'1px solid gray',
                            padding:'5px',
                            width:'100%',
                            marginTop:'10px'
                            }}
           type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required />
        <br />
        <input style={{
                            backgroundColor:'white',
                            color:'black',
                            borderRadius:'5px',
                            border:'1px solid gray',
                            padding:'5px',
                            width:'100%',
                            marginTop:'10px'
                            }}
         type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br />
        <input style={{
                            backgroundColor:'#F1C40F',
                            borderRadius:'5px',
                            border:'1px solid gray',
                            padding:'5px',
                            width:'100%',
                            marginTop:'10px'
                            }}
       type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }} >{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }} >User {newUser ? 'created' : 'Logged In'} successfully</p>
      }
      <button style={{
                            backgroundColor:'blue',
                            color:'white',
                            borderRadius:'5px',
                            border:'1px solid gray',
                            padding:'5px',
                            width:'100%',
                            marginTop:'5px'
                            }}
       onClick={fbHandleSignIn}>Sign Up Using Facebook</button>
      <br />
      
          <button style={{
                            backgroundColor:'#DC351B',
                            borderRadius:'5px',
                            color:'white',
                            border:'1px solid gray',
                            padding:'5px',
                            width:'100%',
                            marginTop:'10px'
                            }}
          onClick={handleSignIn} >Sign Up Using Google</button>
    </div>
    </Container>
  );
}

export default Login;

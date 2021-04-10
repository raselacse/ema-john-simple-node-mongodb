
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, SignInWithEmailAndPassword } from './LoginManager';


function Login() {
  
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSign: false,
    newUser: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }
  
  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res =>{
      handleResponse(res, true)
    })
  }
  const signOut = () =>{
    handleSignOut()
    .then(res =>{
      handleResponse(res, false)
    })
  }

  const handleResponse = (res, redirect) =>{
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    console.log(e.target.name, e.target.value)
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = (isPasswordValid && passwordHasNumber)
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      createWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handleResponse(res, true)
      })
    }
    if (!newUser && user.email && user.password) {
      SignInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        handleResponse(res, true)
      })
    }
    e.preventDefault();
  }

  



  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSign ?
          <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign In by Facebook</button>
      {
        user.isSign && <div>
          <h3>User Name: {user.name}</h3>
          <h1>User Email: {user.email}</h1>
          <img src={user.photo} alt={user.photo} />
        </div>
      }
      <h1>Out Own Authentication</h1>
      {/* <p>Email: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}

      <input onChange={() => { setNewUser(!newUser) }} type="checkbox" name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit} action="">
        {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Yourname" />}<br />
        <input onBlur={handleBlur} type="email" name="email" placeholder="email" required /><br />
        <input onBlur={handleBlur} type="password" name="password" placeholder="password" required /><br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      {
        user.success ?
          <p style={{ color: "green" }}>User {newUser ? 'Created' : 'Logged'} In Successfully</p> :
          <p style={{ color: "red" }}>{user.error}</p>
      }
    </div>
  );
}

export default Login;

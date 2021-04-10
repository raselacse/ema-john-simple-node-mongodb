import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () =>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // if already initialized, use that one
      }
}
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        const { displayName, email, photoURL } = result.user;
        const isSignUser = {
          isSign: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        setUserToken()
        return isSignUser;
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential)
      });
  }

  const setUserToken = () =>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token',idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

  export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
 return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      user.success = true
      return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}

export const handleSignOut = () => {
   return firebase.auth()
      .signOut()
      .then(() => {
        const isSignUserOut = {
          isSign: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        return isSignUserOut;
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential)
      });
  }

  export const createWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUserName(name);
          return newUserInfo;
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.errorMessage;
          newUserInfo.success = false;
          return newUserInfo;
        });
  }

  export const SignInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.errorMessage;
          newUserInfo.success = false;
          return newUserInfo;
        });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log('user name updated successfully')
    }).catch(function (error) {
    });
  }
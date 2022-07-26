import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config';

export const initializeLoginFramwork = () => {
    //(firebase.apps.length === 0) eita na korle firebase app duplicate r dekhabe
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handelGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    //firebase.auth().signInWithPopup(provider) eita ekta promice
    //promise ta puron korte o pare na o korte pare, sei jonno return dite hobe
    //return dile e amra promise ta pabo
    //promise ta payor por result ta  2nd return kore disce
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name : displayName,
        email : email,
        photo: photoURL,
        success: true,
      }
      return signedInUser;
    })

    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }


  export const handelSignOut = () => {
    return firebase.auth().signOut()
    .then (res => {
      const signedOutUser = {
        isSignedIn: false,
        name : '',
        photo : '',
        email : '',
        // error: '', //eikhane jonkar korse (eikhane o kaj hoy)
      }
      return signedOutUser;
    })
    .catch(arr => {
    })
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log("createUserWithEmailAndPassword",res)
        // const newUserInfo = {...user}
        const newUserInfo = res.user
        newUserInfo.error = '';
        newUserInfo.success =true;
        //updateUserName() er kaj ta bujlam na
        updateUserName(name);
        return newUserInfo;

      })
      .catch(err => {
        const newUserInfo = {};
        newUserInfo.error = err.message
        newUserInfo.success = false;
        return newUserInfo;
      })
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user
        newUserInfo.error = '';
        newUserInfo.success =true;
        console.log('sign in user info', res.user)
        return newUserInfo;
        
      })
      .catch(err => {
        const newUserInfo = {};
        newUserInfo.error = err.message
        newUserInfo.success = false;
        return newUserInfo;
      })
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    })
    .then(res => {
      console.log("user name updated successfully")
    })
    .catch(err => {
      console.log(err.message)
    })
  }



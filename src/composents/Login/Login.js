//nicher 2 ta import ei vabe e korte hobe
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, handelGoogleSignIn, handelSignOut, initializeLoginFramwork, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  
  const [newUser, setNewUser] = useState(false);
  const [user, setUser]  = useState({
    isSignedIn: false,  
    name: '',
    email: '',
    password: '',
    photo: '',
    error:'', //eikhane jonkar koreni ami korlam (eikhane o kaj hoy)
    success: false 

  })

  initializeLoginFramwork();

  //context take call korce (setLoggedInUser)e data save korbo
  //data ta save hobe jokhon amara signIn btn e click korbo
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  
  const history = useHistory();//login.js component thake abar shipment container e jete hobe seita passe
  const location = useLocation(); //useLocation hosse website er current/ akhon je jaygay ase seitar location payo jay

  //from e location jasse, (location.state) er maddome. privateRouter.js e (state: { from: location }) eikhane je location ta celo
  const {from} = location.state || {from: {pathname: "/"}}

  console.log("user",user)

  const googleSignIn = () => {
      handelGoogleSignIn()
      
      .then(res => {
        console.log("handelGoogleSignIn", res);
        handelResponses(res, true);

      })
  }

  const signOut = () => {
      handelSignOut()
      .then(res => {
        handelResponses(res, false);
      }); 
  }
  

  const handelResponses = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res); //eikhane (Context er setLoggedInUser e data save hosse )
    if(redirect){
      //.replace mane bojasse()login component ke clean kore shipment component e niye jasse
      //shipment component e jete hobe sei locathon ta passe (from) thake
      history.replace(from);//shipment component e thake login component e niye jay sortho puron hoye gele abar shipment component e firaye dey 
    }
    
  }

  const handleBlue = (e) => {
    //e hosse event ta jekhan thake tigger hoyse, target hosse je element ta tigger hoyse 
    // console.log(e.target.value)
    /* email input e naim dile result ei vabe astese (event.target.value) eitar maddome
         naim  */
    // console.log(e.target.name, e.target.value)
    /*  n
        email naim*/


    // debugger;
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
      console.log(isFieldValid)
    }

    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      console.log(e.target.name, e.target.value, e.target.value.langth);
      isFieldValid = (isPasswordValid && passwordHasNumber);
    }

    if(isFieldValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value //e.target.name ( amra jothy email dei tahole seita r pass dile seita)
      setUser(newUserInfo);
    }

  }

  const handleSubmit = (e) => {
    console.log({name: user.name, email: user.email, password: user.password})
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handelResponses(res, true);
      });
    }

    
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handelResponses(res, true);
    });

    }
    e.preventDefault()
  }

  

  return (
    <div style={{textAlign: 'center'}}>

      {
        //if else condition ke short cut lekhar upoy (? eta if condition er jonno) (: else condition er jonno)
        user.isSignedIn 
        ? 
        <button onClick={signOut}>Sign Out</button> 
        :
        <button onClick={googleSignIn}>Sign In</button>
      }
      
      <br />
      <button>facebook</button>
      <br />

      {
        user.isSignedIn && 
        <div style={{margin:'10px'}}>
          {/* data gule user state thake neyo hosse */}
          <img src={user.photo} alt="" />
          <p>Welcome, {user.name}</p>
          <p>Your Email : {user.email}</p>
        </div>  
      }

      <h1>Our Own Authentication</h1>
      
      {/* setNewUser(!newUser) ta bujini */}
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User SignUp</label>

      <form onSubmit={handleSubmit}>

        {/* (onChange) tokhon e call hobe jokhon inpute Tag er vitore kisu change hobe */}
        {/* (onBlur) tokhon e call hobe jokhon inpute Tag er vitore click hobar por onno kotho click hobe*/}

        { newUser && <input type="text" name="name"  onBlur={handleBlue} placeholder="Your name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlue} placeholder='Your Email Address' required />
        <br />
        <input type="password" name="password" onBlur={handleBlue} placeholder='Your password' id="" required />
        <br />
        {/* form er vitore button er jaygai submit type er ekta input tag dite hoy */}
        <input type="submit" value={newUser ? 'SignUp' : 'SignIn'} />

      </form>

      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>User { newUser ?'Created' : 'loggedIn'} Successfully</p>
      }
      
    </div>
  );
}

export default Login;

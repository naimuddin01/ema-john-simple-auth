import React, { useContext } from 'react';
import { Route, Redirect  } from 'react-router-dom';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../App';


const PrivateRoute = ({children, ...rest}) => {
    //(useContext ta use kortece) loggedInUser er vitorer data ta use korar jonno
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser.email)

    return (
        
        <Route
      {...rest}
      // render={({ location }) location hosse router er nijesso ekta props, jar maddome current location payo jay
      render={({ location }) => // (location) er maddome jana jasse web site er current location ta

      //loggedInUser.email ta jothy thake tahole (PrivateRoute component er vitore je children thakbe seta te jabe)
        loggedInUser.email ? (
          children
        ) 
        :
        (
      //redirect hosse router er nijesso component(eikhane location ta tokhon asbe jokhon (user.email ta thakbe na) mane user login koreni)
      //Redirect use kortese tar karon jothy (loggedInUser.email) na thake tahole login.js e chole jabe
          <Redirect

            to={{
                pathname: "/login",
                state: { from: location }//router location er state er from er vitore location payo jabe(current location)
              }}
        
          />
        )
      }  
    />
    );
};

export default PrivateRoute;
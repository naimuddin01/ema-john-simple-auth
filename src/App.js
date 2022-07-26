// import { useEffect, useState } from 'react';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Header from './composents/Header/Header';
import Inventory from './composents/Inventory/Inventory';
import Login from './composents/Login/Login';
import NotFound from './composents/NotFound/NotFound';
import PrivateRoute from './composents/PrivateRoute/PrivateRoute';
import ProductDetail from './composents/ProductDetail/ProductDetail';
import Review from './composents/Review/Review';
import Shipment from './composents/Shipment/Shipment';
import Shop from './composents/Shop/Shop';

//ekta data onek gulo component e use korar jonno createContext() use kora hoy
export const UserContext = createContext();

function App() {

  //jokhon kno user login hobe tokhon tar data rakhar jonno nicher state ta use kora hosse
  const [loggedInUser, setLoggedInUser] = useState({}); 

  return (
    // contex ta use korar niyom
    //[loggedInUser, setLoggedInUser] eta peramiter use korar karon
    //amra onno kotho thake (setLoggedInUser) use kore loggedInUser er maan set korbo (maan ta set kortece login.js thake)
    //r loggedInUser ta onno kotho use korbo bole pass korce
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <h3>email :  {loggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
      <Switch>
        <Route exact path = "/"><Shop/></Route>
        <Route path = "/shop"><Shop/></Route>
        <Route path = "/review"> <Review/> </Route>
        
        <Route path = "/login"><Login /></Route>
        {/* eikhane route use na kore PrivateRoute component use kortece tar karon.

              amra jothy procede order btn e click kori tahole, ekta condition set
              kore dibo tai

              1. age check korbe kono loggedInUser.email ase kina jothy thake thaole,
              PrivateRoute er children(Shipment) composents e nibo,

              2. PrivateRoute er children(Shipment) e nite gele r ekta kaj korte hobe,
              kaj ta holo loggedInUser.email jothy na pay tahole to login.js e jasse,
              tarpor login korlam kintu korar por o oy page e thakbe seita ke clean korar jonno,
              (history.replace(from)) korte hobe. ei kaj ta korte hobe login.js component e

              r jothy loggedInUser.email na thake tahole login.js e jabe

              puro lojic ta PrivateRoute component e kora hoyse

        */}
        <PrivateRoute path = "/shipment">
          <Shipment />
        </PrivateRoute>
        <PrivateRoute path = "/orders"><Inventory/></PrivateRoute>
        <Route path = "/product/:productKey"><ProductDetail/></Route>
        <Route path='*'><NotFound/></Route>
      </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;

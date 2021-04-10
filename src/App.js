import React, { createContext, useState } from 'react';
import './App.css';
import Header from "./component/Header/Header";
import Shop from "./component/Shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Shipment from './component/Shipment/Shipment';
import Login from './component/Login/Login';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Login email: {loggedInUser.email}</h3>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <h1>Not Found 404</h1>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import SelectRide from './Components/SelectRide/SelectRide';
import Destination from './Components/Destination/Destination';
import { createContext, useState } from 'react';
import Header from './Components/Header/Header';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    {/* <h2>Name:{loggedInUser.email}</h2> */}
    <Router>
    <Header></Header>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
              <Login></Login> 
          </Route>
          <PrivateRoute path="/selectRide/:rideName">
              <SelectRide></SelectRide>
          </PrivateRoute>
          <PrivateRoute path="/destination">
              <Destination></Destination> 
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
            </Route>
            <Route path="*">
               <NotFound></NotFound>
          </Route>
        </Switch>
     </Router>
     </UserContext.Provider>
  );
}

export default App;

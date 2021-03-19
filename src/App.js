import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destination from './Destination/Destination';
import Blog from './components/Blog/Blog';
import TravelLocation from './components/TravelLocation/TravelLocation';
import { createContext, useState } from 'react';
import PrivateRout from './components/PrivateRoute/PrivateRout';
import SearchLocation from './components/SearchLocation/SearchLocation';

export const UserContext = createContext()
 
function App() {
  const [loggedIn, setLoggedIn] = useState({})

  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
    <Router>
      <Header></Header>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/LogIn">
            <Destination></Destination>
          </Route>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/search/:searchId">
            <SearchLocation></SearchLocation>
          </Route>
          <PrivateRout path="/travel/:id">
            <TravelLocation></TravelLocation>
          </PrivateRout>
          <Route exact path="/">
           <Home></Home>
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;

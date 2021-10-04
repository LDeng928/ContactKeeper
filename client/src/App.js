import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Home } from './components/pages/Home'
import { About } from './components/pages/About'
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Alerts } from './components/layout/Alerts';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './Utils/setAuthToken';

// Get request /api/auth as soon as the app is loaded
if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
   
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts></Alerts>
                <Switch>
                  <Route exact path='/' component={ Home }></Route>
                  <Route exact path='/about' component={ About }></Route>
                  <Route exact path='/register' component={ Register }></Route>
                  <Route exact path='/login' component={ Login }></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;

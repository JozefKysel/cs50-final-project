import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Library from './components/library';
import PrivateRoutes from './services/private-routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <PrivateRoutes exact path="/dashboard" component={Dashboard}/>
        <PrivateRoutes exact path="/library" component={Library}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

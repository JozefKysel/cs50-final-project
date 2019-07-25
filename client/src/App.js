import React from 'react';
import { Route, BrowserRouter, Link } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import './App.css';

function App() {
  return (
    <div>
      <Dashboard/>
      <BrowserRouter>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

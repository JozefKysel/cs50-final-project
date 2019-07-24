import React from 'react';
import { Route, Link } from "react-router-dom";
import Login from './components/login';
import Register from './components/registes';
import './App.css';

function App() {
  return (
    <div>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
    </div>
  );
}

export default App;

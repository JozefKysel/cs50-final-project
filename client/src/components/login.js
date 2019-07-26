import React, { useState } from 'react';
import api from '../services/api-client';
import './login.css';

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = e => setUsername(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please insert your username/password');
    } else {
      api.loginUser(username, password)
        .then(res => res.json())
        .then(res => {
          if (res.access_token) {
            saveAccessToken(res.access_token);
            props.history.push('/dashboard');
          }
        });
    }
  }

  const saveAccessToken = token => localStorage.setItem('token', token);

  return (
    <div className="form">
      <h4 id="header">the. books.</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={username} onChange={handleUsername} aria-describedby="emailHelp" placeholder="Enter username"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handlePassword} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;

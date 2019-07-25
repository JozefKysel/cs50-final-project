import React, { useState } from 'react';
import api from '../services/api-client';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = e => setUsername(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please insert your username/password');
    } else {
      api.loginUser(username, password)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username </label>
        <input type="text" id="username" value={username} onChange={handleUsername} placeholder="Username"/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password </label>
        <input type="password" id="password" value={password} onChange={handlePassword} placeholder="Password"/>
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;

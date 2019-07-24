import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = value => setUsername(value);
  const handlePassword = value => setPassword(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please insert your username/password');
    } else {
      // api call
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={handleUsername} placeholder="Username"/>
      <input type="password" value={handlePassword} placeholder="Password"/>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;

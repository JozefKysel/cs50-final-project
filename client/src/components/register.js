import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setConf] = useState('');

  const handleUsername = value => setUsername(value);
  const handleEmail = value => setEmail(value);
  const handlePassword = value => setUsername(value);
  const handleConf = value => setConf(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please fill out all fields');
    } else if (password !== passwordConf) {
      alert('Passwords do not match');
    } else {
      // api call
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={handleUsername}/>
      <input type="text" value={email} onChange={handleEmail}/>
      <input type="password" value={password} onChange={handlePassword}/>
      <input type="password" value={passwordConf} onChange={handleConf}/>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;

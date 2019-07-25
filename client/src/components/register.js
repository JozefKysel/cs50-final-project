import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/api-client';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setConf] = useState('');

  const handleUsername = e => setUsername(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleConf = e => setConf(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please fill out all fields');
    } else if (password !== passwordConf) {
      alert('Passwords do not match');
    } else {
      api.registerUser(username, email, password)
        .then(res => res.status === 201 && <Redirect to='/login'/>)
        .catch(e => console.log(e));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={handleUsername}/>
      <input type="text" value={email} onChange={handleEmail}/>
      <input type="password" value={password} onChange={handlePassword}/>
      <input type="password" value={passwordConf} onChange={handleConf}/>
      <button type="submit" value="Register"></button>
    </form>
  );
}

export default Register;

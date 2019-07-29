import React, { useState } from 'react';
import api from '../services/api-client';
import { Link } from 'react-router-dom';
import './register.css';

function Register(props) {
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
        .then(res => res.status === 201 && props.history.push('/'))
        .catch(e => console.log(e));
    }
  }

  return (
    <div className="register">
      <Link to='/'><p>Login</p></Link>
      <h4 id="header">the. books.</h4>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input type="text" className="form-control" value={username} onChange={handleUsername} aria-describedby="emailHelp" placeholder="Enter username"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="text" className="form-control" value={email} onChange={handleEmail} aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" value={password} onChange={handlePassword} placeholder="Password"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="password" className="form-control" value={passwordConf} onChange={handleConf} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;

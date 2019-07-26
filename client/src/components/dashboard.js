import React, { useState, useEffect } from 'react';
import api from '../services/api-client';
import Library from './library';
import parsers from '../services/parsers';
import './dashboard.css';

function Dashboard() {

  const [bookList, setBooks] = useState([]);

  const fetchMyBooks = completed =>
    api.fetchMyBooks(completed)
    .then(res => res.json())
    .then(res => setBooks(res));

  useEffect(() => {
    fetchMyBooks();
  }, [])


  const handleSearch = e => {
    if (e.target.value) {
      api.searchForBooks(e.target.value)
        .then(res => res.json())
        .then(res => res && setBooks(parsers.parseBooks(res)))
        .catch(e => console.log(e));
      }
  }

  return (
    <div className="container-dashboard">
      <div className="logo">
        <h4 id="name-logo"> the. books.</h4>
        <input id="search" type="text" placeholder="search" onKeyUp={handleSearch}/>
      </div>
      <div className="navbar">
        <button onClick={fetchMyBooks} className="navigation">my library</button>
        <button onClick={() => fetchMyBooks('false')} className="navigation">want to read</button>
        <button onClick={() => fetchMyBooks('true')} className="navigation">read</button>
      </div>
      <div className="library">
        <Library fetchMyBooks={fetchMyBooks} bookList={bookList}/>
      </div>
    </div>
  )
}

export default Dashboard;

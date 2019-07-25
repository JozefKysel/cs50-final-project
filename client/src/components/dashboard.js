import React, { useState, useEffect } from 'react';
import api from '../services/api-client';
import Library from './library';
import parsers from '../services/parsers';
import './dashboard.css';

function Dashboard() {

  const [bookList, setBooks] = useState([]);

  useEffect(() => {
  }, [])

  const handleSearch = e => {
    api.searchForBooks(e.target.value)
      .then(res => res.json())
      .then(res => setBooks(parsers.parseBooks(res)))
      .catch(e => console.log(e));
  }

  return (
    <div className="container">
      <input type="text" placeholder="search" onKeyUp={handleSearch}/>
      <Library bookList={bookList}/>
    </div>
  )
}

export default Dashboard;

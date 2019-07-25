import React from 'react';
import api from '../services/api-client';
import './book.css';

function Book({ book }) {

  const saveBookToRead = book => api.saveBookToRead(book);

  return (
    <div className="book">
      {!book.user_id && <button onClick={() => saveBookToRead(book)}>To Read</button>}
      <img src={book.image}/>
    </div>
  );
}

export default Book;

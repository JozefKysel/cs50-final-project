import React from 'react';
import api from '../services/api-client';
import './book.css';

function Book({ book, fetchMyBooks}) {

  const saveBookToRead = book => api.saveBookToRead(book);
  const markAsRead = (book) => {
    api.markAsRead(book);
    fetchMyBooks();
  };

  return (
    <div className="book">
      <img className="cover" src={book.image} alt="book-cover"/>
      <div className="book-info">
        <p className="book-details">Author: {book.author}</p>
        <p className="book-details">Title:  {book.title}</p>
        <p className="book-details">Rating: {book.rating}</p>
        {!book.completed ? <button className="book-details buttons" onClick={() => markAsRead(book)}>Mark as read</button> : <div className="book-details"> Read </div>}
        {!book.user_id && <button className="book-details buttons" onClick={() => saveBookToRead(book)}>To Read</button>}
      </div>
    </div>
  );
}

export default Book;

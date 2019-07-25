import React from 'react';
import Book from './book';
import './library.css';

function Library({ bookList }) {
  return bookList.length ? bookList.map(book => (
    <div className="container">
      <Book book={book}/>
    </div>
  )) : (<div>Search for books....</div>)
}

export default Library;

import React from 'react';
import Book from './book';
import './library.css';

function Library({ bookList, fetchMyBooks }) {
  const unique_key = (book) => book.author + book.title + book.rating;
  return bookList.length > 0 ? bookList.map(book =>
    <div className="library" key={unique_key(book)}>
      <Book fetchMyBooks={fetchMyBooks} bookList={bookList} book={book}/>
    </div>
  ) : <div className="search">Search for books....</div>
}

export default Library;

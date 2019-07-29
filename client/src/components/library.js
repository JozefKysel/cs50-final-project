import React from 'react';
import Book from './book';
import './library.css';

function Library({ bookList, fetchMyBooks }) {
  let index = 0;
  const unique_key = (book) => book.author + book.title + book.rating;
  return bookList.length > 0 ? bookList.map(book =>
    <div className="library" key={++index}>
      <Book fetchMyBooks={fetchMyBooks} bookList={bookList} book={book}/>
    </div>
  ) : <div className="search">Search for books....</div>
}

export default Library;

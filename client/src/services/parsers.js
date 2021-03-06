class Book {
  constructor(rating, author, image, smallImage, title) {
    this.rating = rating;
    this.author = author;
    this.image = image;
    this.smallImage = smallImage;
    this.title = title;
  }
}

exports.parseBooks = bookArray => bookArray.GoodreadsResponse.search.results.work.map(book =>
      new Book(book.average_rating.$, book.best_book.author.name.$, book.best_book.image_url.$, book.best_book.small_image_url.$, book.best_book.title.$))

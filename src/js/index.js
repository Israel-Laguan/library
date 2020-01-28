// @ts-check

const myLibrary = [];

/**
 * Constructor for Books belonging the Library
 * @param {String} title
 * @param {String} author
 * @param {Number} pages
 * @param {Boolean} read
 */
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? 'read' : 'not read'
  }.`;
}
const addBookToLibrary = (title, author, pages, read) => {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return myLibrary;
};
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 293, false);
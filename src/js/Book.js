// @ts-check
import { infoT, viewT } from './templates.js';

/**
 * Constructor for Books belonging the Library
 * @param {String} title Creative Identifier for the book
 * @param {String} author Name of the one that wroted the book
 * @param {String} isbn Unique ID for the book
 * @param {Number} pages Integer with number of pages of book
 * @param {Boolean} read If the user already read the book
 */
function Book(
  title = 'Test Title',
  author = 'Test Author',
  isbn = '978-3-16-148410-0',
  pages = 296,
  read = false,
) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.isbn = isbn;
  this.info = infoT(this.title, this.author, this.isbn, this.pages, this.read);
  this.view = viewT(this.title, this.author, this.isbn, this.pages, this.read);
}

export default Book;

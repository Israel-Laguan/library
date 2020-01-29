// @ts-check

export const myLibrary = [];

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
  this.render = () => `
  <td><span>Title:</span>${this.title}</td>
  <td><span>Author:</span>${this.author}</td>
  <td><span>Pages:</span>${this.pages}</td>
  <td><span>Read?:</span>${this.read ? 'Read' : 'Not read'}</td>
  <td><button>Erase</button></td>
  `;
}

/**
 * Adds a Book to the Library
 * @param {String} title
 * @param {String} author
 * @param {Number} pages
 * @param {Boolean} read
 * @returns {Array} Library List with Books
 */
export const addBookToLibrary = (title, author, pages, read) => {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return myLibrary;
};


window.addEventListener('load', () => {
  addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 293, false);
  addBookToLibrary('The Lord of The Rings', 'J.R.R. Tolkien', 646, true);
  const list = document.getElementById('list');
  myLibrary.forEach((book, id) => {
    list.innerHTML += `
    <tr key=${id}>${book.render()} </tr>
    `;
  });
});

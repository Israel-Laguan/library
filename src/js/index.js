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
  <td><span>Title:</span><a href="https://www.google.com/?q=%22${
  this.title
}+by+${this.author}%22&as_filetype=pdf">${this.title}</a></td>
  <td><span>Author:</span><a href="https://www.google.com/?q=%22${
  this.author
}%22">${this.author}<a/></td>
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

/**
 * render myLibrary on HTML
 */
export const showList = () => {
  const list = document.getElementById('list');
  myLibrary.forEach((book, id) => {
    list.innerHTML += `
    <tr key=${id}>${book.render()} </tr>
    `;
  });
};

const validateForm = (formData) => {
  if (!formData.title) return { error: 'Title is empty' };
  if (!formData.author) return { error: 'Author is empty' };
  return {};
};

window.addEventListener('load', () => {
  showList();
});

const newBookForm = document.getElementById('new-book-form');
newBookForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = {
    // @ts-ignore
    title: newBookForm.title.value,
    // @ts-ignore
    author: newBookForm.author.value,
    // @ts-ignore
    pages: newBookForm.pages.value,
    // @ts-ignore
    read: newBookForm.read.checked,
  };
  const { error } = validateForm(data);
  if (error) {
    document.getElementById('alert').innerText = error;
    return;
  }
  addBookToLibrary(data.title, data.author, data.pages, data.read);
  showList();
  // @ts-ignore
  newBookForm.reset();
});

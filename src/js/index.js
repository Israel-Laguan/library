// @ts-check
export const myLibrary = [];

/**
 * Constructor for Books belonging the Library
 * @param {String} title
 * @param {String} author
 * @param {String} isbn
 * @param {Number} pages
 * @param {Boolean} read
 */
function Book(title = 'Test Title', author = 'Test Author', isbn = '978-3-16-148410-0', pages = 296, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.isbn = isbn;
  this.info = () => `${this.title} by ${this.author}, ISBN ${this.isbn}, ${this.pages} pages, ${
    this.read ? 'read' : 'not read'
  }.`;
  this.render = () => `
  <td><span>Title:</span><a href="https://www.google.com/?q=%22${
  this.title
}+by+${this.author}%22&as_filetype=pdf">${this.title}</a></td>
  <td><span>Author:</span><a href="https://www.google.com/?q=%22${
  this.author
}%22">${this.author}<a/></td>
  <td><span>ISBN:</span>${this.isbn}</td>
  <td><span>Pages:</span>${this.pages}</td>
  <td><span>Read?:</span>${this.read ? 'Read' : 'Not read'}</td>
  <td><button>Erase</button></td>
  `;
}

/**
 * Adds a Book to the Library
 * @param {String} title
 * @param {String} author
 * @param {String} isbn
 * @param {Number} pages
 * @param {Boolean} read
 * @returns {Array} Library List with Books
 */
export const addBookToLibrary = (title, author, isbn, pages, read) => {
  const book = new Book(title, author, isbn, Number(pages), read);
  myLibrary.push(book);
  return myLibrary;
};

/**
 * render myLibrary on HTML
 */
export const showList = () => {
  if (myLibrary.length === 0) {
    document.getElementById('notification').innerHTML = `
    <div class="notice" id="notice">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      <p><b>Aware!:</b> No books on Library! ⬇ Add here</p>
    </div>
    `;
    return;
  }
  const list = document.getElementById('list');
  myLibrary.forEach((book, id) => {
    list.innerHTML += `
    <tr key=${id}>${book.render()}</tr>
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
    isbn: newBookForm.isbn.value,
    // @ts-ignore
    pages: newBookForm.pages.value,
    // @ts-ignore
    read: newBookForm.read.checked,
  };
  const { error } = validateForm(data);
  if (error) {
    document.getElementById('notification').innerHTML = `
    <div class="alert" id="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      <p><b>Danger!:</b> ${error}</p>
    </div>
    `;
    return;
  }
  addBookToLibrary(data.title, data.author, data.isbn, data.pages, data.read);
  showList();
  // @ts-ignore
  newBookForm.reset();
  document.getElementById('notification').innerHTML = `
  <div class="notice" id="notice">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    <p><b>Success!:</b> Book Added!</p>
  </div>
  `;
});

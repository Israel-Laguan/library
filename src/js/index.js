// @ts-check
/**
 * Show Book information
 *
 * [INFO]: template intended for internal use
 * @param {String} title Creative Identifier for the book
 * @param {String} author Name of the one that wroted the book
 * @param {String} isbn Unique ID for the book
 * @param {Number} pages Integer with number of pages of book
 * @param {Boolean} read If the user already read the book
 * @return {String} Information already formatted
 */
const infoT = (
  title, author, isbn, pages, read,
) => `
  ${title} by ${author}, ISBN ${isbn}, ${pages} pages, ${
  read ? 'read' : 'not read'
}.`;

/**
 * Display information about Book in HTML
 *
 * [VIEW]: template intended for HTML
 *
 * [TABLE]: intended to be a row in a table
 * @param {String} title Creative Identifier for the book
 * @param {String} author Name of the one that wroted the book
 * @param {String} isbn Unique ID for the book
 * @param {Number} pages Integer with number of pages of book
 * @param {Boolean} read If the user already read the book
 * @return {String} HTML ready with info of book
 */
const viewT = (
  title, author, isbn, pages, read,
) => `
  <td><span>Title:</span>
    <a 
    href="https://www.google.com/?q=%22${title}+by+${author}%22&as_filetype=pdf" 
    target="_blank" rel="noopener noreferrer"
    >
      ${title}
    </a>
  </td>
  <td><span>Author:</span>
    <a 
    href="https://www.google.com/?q=%22${author}%22" 
    target="_blank" rel="noopener noreferrer"
    >
      ${author}
    <a/>
  </td>
  <td><span>ISBN:</span>${isbn}</td>
  <td><span>Pages:</span>${pages}</td>
  <td><span>Read?:</span>
    <button id="update-read-${isbn}" value="${read}">
      ${read ? 'Read' : 'Not Read'}
    </button> 
  </td>
  <td>
    <button
      class="erase-button" 
      id="erase-${isbn}"
    >
      Erase
    </button>
  </td>
`;

/**
 * Zero Treat Level notification
 * [VIEW]: template intended for HTML
 * [NOTIFICATION]: To show internal information
 * @param {String} message Text to show to user
 * @return {String} HTML ready with info of book
 */
const noticeT = (message) => `
<div class="notice" id="notice">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    <p><b>Look!:</b> ${message}!</p>
</div>
`;

/**
 * Medium Treat Level notification
 * [VIEW]: template intended for HTML
 * [NOTIFICATION]: To show internal information
 * @param {String} error description of problem
 */
const alertT = (error) => `
<div class="alert" id="alert">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    <p><b>Aware!:</b> ${error}</p>
</div>
`;

/**
 * High Treat Level notification
 * [VIEW]: template intended for HTML
 * [NOTIFICATION]: To show internal information
 * @param {String} caution Text to show to user
 * @return {String} HTML ready with info of book
 */
const warningT = (caution) => `
<div class="warning" id="warning">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    <p><b>Warning!:</b> ${caution}!</p>
</div>
`;

/**
 * Constructor for Books belonging the Library
 *
 * [REQUIREMENT]
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

/**
 * Return Objects for  Storage manipulation
 * @typedef {Object} CRUDResponse Internal access to Storage
 * @property {String} [error=null] Message explaining the problem
 * @property {String} [ok=null] Message with information
 * @property {Object[]} [data=null] Objects from Storage
 */

/**
 * Provides initialization for a CRUD based on localStorage
 * @param {Storage} storage object to access local storage space
 * @returns {CRUDResponse } Object with valuable info
 */
const init = storage => {
  try {
    const myLibrary = JSON.parse(storage.getItem('myLibrary'));
    if (!myLibrary) storage.setItem('myLibrary', JSON.stringify([]));
  } catch (error) {
    return { error: error.message };
  }
  return { ok: 'Library created!', data: [] };
};

/**
 * Must return the array myLibrary on localStorage
 * @param {Storage} storage object to access local storage space
 * @returns {CRUDResponse } Object with valuable info
 */
const getAll = storage => {
  try {
    const myLibrary = JSON.parse(storage.getItem('myLibrary'));
    return { ok: 'Library retrieved!', data: myLibrary };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Must add the given item to myLibrary on localStorage.
 * returns the book on data
 * @param {Book} book Book to be added
 * @param {Storage} storage object to access local storage space
 * @returns {CRUDResponse } Object with valuable info
 */
const add = (book, storage) => {
  try {
    const myLibrary = JSON.parse(storage.getItem('myLibrary'));
    const filtered = myLibrary.filter(b => b.isbn === book.isbn);
    if (filtered.length > 0) {
      return {
        error: `The book ${book.title} is already on library. Do you want to update it?`,
      };
    }
    myLibrary.push(book);
    storage.setItem('myLibrary', JSON.stringify(myLibrary));
    return { ok: `Book ${book.title} is saved on the library.`, data: [book] };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Must remove the gived item from myLibrary on localStorage.
 * returns the book erased on data
 * @param {Book} book Book to be removed
 * @param {Storage} storage object to access local storage space
 * @returns {CRUDResponse } Object with valuable info
 */
const remove = (book, storage) => {
  try {
    const myLibrary = JSON.parse(storage.getItem('myLibrary'));
    let index = -1;
    myLibrary.forEach((b, i) => {
      if (b.isbn === book.isbn) {
        index = i;
      }
    });
    if (index > -1) {
      myLibrary.splice(index, 1);
      storage.setItem('myLibrary', JSON.stringify(myLibrary));
      return { ok: `Book ${book.title} was removed from the library.`, data: [book] };
    }
    return {
      error: `The book ${book.title} is not on the library. Do you want to add it?`,
    };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Must change the given item from myLibrary on localStorage.
 * Be aware to no mix the two books, the first is lost at the end.
 * Returns the book erased on data.
 * @param {Book} book Book to be changed
 * @param {Book} newBook Updated Book
 * @param {Storage} storage object to access local storage space
 * @returns {CRUDResponse } Object with valuable info
 */
const update = (book, newBook, storage) => {
  try {
    const myLibrary = JSON.parse(storage.getItem('myLibrary'));
    const newLibrary = [...myLibrary];
    let flag = true;
    let index = -1;
    for (let i = 0; flag && i < myLibrary.length; i += 1) {
      if (myLibrary[i].isbn === book.isbn) {
        index = i; flag = false;
      }
    }
    if (index > -1) {
      newLibrary[index] = newBook;
      storage.setItem('myLibrary', JSON.stringify(newLibrary));
      return {
        ok: `Book ${newBook.title} was updated in the library.`,
        data: [newBook],
      };
    }
    return {
      error: `The book ${book.title} was not on the library. Do you want to add it?`,
    };
  } catch (error) {
    return { error: error.message };
  }
};

const storage = window.localStorage;
init(storage);

/**
 * Add a new notification on HTML
 * @param {('notice'|'alert'|'warning')} type
 * @param {String} text
 */
const showNotification = (type, text) => {
  const notification = document.getElementById('notification');
  try {
    switch (type) {
      case 'notice':
        notification.innerHTML += noticeT(text);
        break;
      case 'alert':
        notification.innerHTML += alertT(text);
        break;
      case 'warning':
        notification.innerHTML += warningT(text);
        break;
      default:
        throw new Error('You tried to create an invalid type of notification!');
    }
  } catch (error) {
    notification.innerHTML += warningT(error.message);
  }
};

/**
 * After show data from Storage, verify it
 * @param {CRUDResponse} CRUDResponse
 * @returns {Book[]} Array of Books (even if just one or empty)
 */
const verifyLibrary = ({ error, ok, data }) => {
  try {
    if (error) {
      showNotification('warning', error);
      return [];
    }
    showNotification('notice', ok);
    if (data.length < 1) {
      showNotification('alert', 'No books on Library! ⬇ Add here');
      return [];
    }
    return data;
  } catch (error) {
    showNotification('warning', error.message);
    return [];
  }
};

/**
 * When you press Erase Button, it erase
 * the Book from localStorage
 * @param {Book} book
 * @return {Book[]}
 */
const addRemoveEvent = (book) => {
  const bookRow = document.getElementById(book.isbn);
  try {
    const { error, ok, data } = remove(book, storage);
    if (error) {
      showNotification('warning', error);
      return [];
    }
    showNotification('notice', ok);
    if (data.length < 1) {
      showNotification('warning', 'An Error happen on addRemoveEvent function');
      return [];
    }
    showNotification('notice', 'Book Erased!');
    bookRow.remove();
    return data;
  } catch (error) {
    showNotification('warning', error.message);
    return [];
  }
};

/**
 * When you press Read | Not Read Button,
 * it update localStorage read field
 * @param {Book} book
 * @param {Boolean} status
 * @return {Book[]}
 */
const addUpdateEvent = (book, status) => {
  try {
    const newBook = { ...book, read: status };
    const { error, ok, data } = update(book, newBook, storage);
    if (error) {
      showNotification('warning', error);
      return [];
    }
    showNotification('notice', ok);
    if (data.length < 1) {
      showNotification('warning', 'An Error happen on addUpdateEvent function');
      return [];
    }
    showNotification('notice', 'Book Updated!');
    return data;
  } catch (error) {
    showNotification('warning', error.message);
    return [];
  }
};

/**
 * Show the info from Storage into HTML
 *
 * [REQUIREMENT]
 */
const render = () => {
  try {
    const { error, ok, data } = getAll(storage);
    const myLibrary = verifyLibrary({ error, ok, data });
    const list = document.getElementById('list');
    list.innerHTML = '';
    myLibrary.forEach((book, id) => {
      list.innerHTML += `
      <tr key=${id} id="${book.isbn}">${book.view}</tr>
      `;
      document.body.addEventListener('click', (event) => {
        const button = event.srcElement;
        // @ts-ignore
        if (button.id === `erase-${book.isbn}`) {
          return addRemoveEvent(book);
        }
        // @ts-ignore
        if (button.id === `update-read-${book.isbn}`) {
          // @ts-ignore
          const { value } = button;
          const thisbutton = document.getElementById(`update-read-${book.isbn}`);
          thisbutton.innerText = value !== 'true' ? 'Read' : 'Not Read';
          // @ts-ignore
          thisbutton.value = value !== 'true';
          return addUpdateEvent(book, value !== 'true');
        }
        return [];
      });
    });
  } catch (error) {
    showNotification('warning', error.message);
  }
};

/**
 * Creates a Book and adds it to localStorage
 *
 * [REQUIREMENT]
* @param {String} title Creative Identifier for the book
 * @param {String} author Name of the one that wroted the book
 * @param {String} isbn Unique ID for the book
 * @param {Number} pages Integer with number of pages of book
 * @param {Boolean} read If the user already read the book
 */
const addBookToLibrary = (title, author, isbn, pages, read) => {
  try {
    const book = new Book(title, author, isbn, pages, read);
    const { error, ok, data } = add(book, storage);
    if (error) {
      showNotification('warning', error);
      return [];
    }
    showNotification('notice', ok);
    if (data.length < 1) {
      showNotification('warning', 'An Error happen on addBook function');
      return [];
    }
    showNotification('notice', 'Book Added!');
    render();
    return data;
  } catch (error) {
    showNotification('warning', error.message);
    return [];
  }
};

/**
 * Check if data from Form is valid
 * @param {Object} formData Data from Form
 * @return {CRUDResponse} Object with response
 */
const validateForm = (formData) => {
  if (!formData.title) return { error: 'Title is empty' };
  if (!formData.author) return { error: 'Author is empty' };
  if (!formData.isbn) return { error: 'ISBN is empty' };
  return {};
};

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
    showNotification('warning', error);
    return [];
  }
  const result = addBookToLibrary(data.title, data.author, data.isbn, data.pages, data.read);
  // @ts-ignore
  if (!result.length < 1) newBookForm.reset();
  return result;
});

window.addEventListener('load', () => {
  render();
});

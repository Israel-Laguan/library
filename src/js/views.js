// @ts-check
import {
  init, getAll, add, remove, Book, update,
} from './Storage.js';
import { alertT, noticeT, warningT } from './templates.js';

const storage = window.localStorage;
init(storage);

/**
 * Add a new notification on HTML
 * @param {('notice'|'alert'|'warning')} type
 * @param {String} text
 */
export const showNotification = (type, text) => {
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
 * @param {import('./Storage').CRUDResponse}
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
    bookRow.style.display = 'none';
    return data;
  } catch (error) {
    showNotification('warning', error.message);
    return [];
  }
};



const addUpdateEvent = (book, checked) => {
  try {
    const newBook = { ...book, read: checked };
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

export const showLibrary = () => {
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
        // @ts-ignore
        if (event.srcElement.id === `erase-${book.isbn}`) {
          return addRemoveEvent(book);
        }
        // @ts-ignore
        if (event.srcElement.id === `update-read-${book.isbn}`) {
          
          // @ts-ignore
          return addUpdateEvent(book, event.srcElement.checked);
        }
        return [];
      });
    });
  } catch (error) {
    showNotification('warning', error.message);
  }
};

export const addBook = (title, author, isbn, pages, read) => {
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
    showLibrary();
    return data;
  } catch (error) {
    showNotification('warning', error.message);
    return [];
  }
};
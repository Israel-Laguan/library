// @ts-check
import Book from './Book.js';

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

export {
  init,
  getAll,
  add,
  remove,
  update,
  Book,
};
import { myLibrary, addBookToLibrary } from '../src/js/index.js';

const issue1 = {
  myLibraryIsArray: libraryArray => Array.isArray(libraryArray),
  addBookToLibraryIsFunction: obj => !!(obj && obj.constructor && obj.call && obj.apply),
  addBookToLibraryAddToArray: () => {
    const before = myLibrary.length;
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 293, false);
    return myLibrary.length === before + 1;
  },
  addBookToLibraryStoresValues: title => {
    addBookToLibrary(title, 'author', 293, false);
    return myLibrary[myLibrary.length - 1].title === title;
  },
  checkTitleStored: author => {
    addBookToLibrary('Testing', author, 293, false);
    return myLibrary[myLibrary.length - 1].author === author;
  },
  checkPagesStored: pages => {
    addBookToLibrary('Testing', 'Testing', pages, false);
    return myLibrary[myLibrary.length - 1].pages === pages;
  },
  checkReadStored: read => {
    addBookToLibrary('Testing', 'Testing', 293, read);
    return myLibrary[myLibrary.length - 1].read === read;
  },
};

/* TEST CASES
console.log(issue1.myLibraryIsArray(myLibrary));
console.log(issue1.addBookToLibraryIsFunction(addBookToLibrary));
console.log(issue1.addBookToLibraryAddToArray());
console.log(issue1.addBookToLibraryStoresValues('Testing 1'));
console.log(issue1.checkTitleStored('Testing 2'));
console.log(issue1.checkPagesStored(100));
console.log(issue1.checkReadStored(true));
*/

export default issue1;
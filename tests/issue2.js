import { myLibrary, addBookToLibrary } from '../src/js/index.js';

const issue2 = {
  addBookToLibraryStoresValues: title => {
    addBookToLibrary(title, 'author', 293, false);
    return myLibrary[myLibrary.length - 1].title === title;
  },
  renderIsFunction: obj => !!(obj && obj.constructor && obj.call && obj.apply),
  listIsHTML: () => document.getElementById('list').childNodes.length > 0,
};

/*
console.log(issue2.addBookToLibraryStoresValues('example title'));
console.log(issue2.renderIsFunction(myLibrary[0].render));
console.log(issue2.listIsHTML());
*/

export default issue2;

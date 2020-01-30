// @ts-check
import { showLibrary, addBook, showNotification } from './views.js';

window.addEventListener('load', () => {
  showLibrary();
});

const validateForm = (formData) => {
  if (!formData.title) return { error: 'Title is empty' };
  if (!formData.author) return { error: 'Author is empty' };
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
  const result = addBook(data.title, data.author, data.isbn, data.pages, data.read);
  // @ts-ignore
  if (!result.length < 1) newBookForm.reset();
  return result;
});
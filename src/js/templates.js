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
export const infoT = (
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
export const viewT = (
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
    <input type='checkbox' id="update-read-${isbn}"
    ${read ? 'checked' : ''}>
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
export const noticeT = (message) => `
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
export const alertT = (error) => `
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
export const warningT = (caution) => `
<div class="warning" id="warning">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    <p><b>Warning!:</b> ${caution}!</p>
</div>
`;
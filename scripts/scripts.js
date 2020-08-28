//initial declarations
let libraryContainer = document.querySelector('#library-container')
let addButton = document.querySelector('#add-button');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = function() {
    //     return `${title} by ${author}, ${pages} pages, ${read ? ' has already read' : ' not read yet'}`
    // }
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? ' has already read' : ' not read yet'}`
}

const addBookToLibrary = (book) => myLibrary.push(book);

const renderAddBookForm = () => console.log("We're going to add a book form here!");

const renderLibrary = () => {
    myLibrary.forEach(book => renderBook(book))
}

const renderBook = (book) => {
    let divBook = document.createElement('div');
    divBook.classList.add('div-book');

    let divTitle = document.createElement('div');
    divTitle.classList.add('div-title');
    divTitle.textContent = book.title;
    divBook.appendChild(divTitle);

    let divAuthor = document.createElement('div');
    divAuthor.classList.add('div-author');
    divAuthor.textContent = book.author;
    divBook.appendChild(divAuthor);
    divBook.appendChild(divTitle);

    let divPages = document.createElement('div');
    divPages.classList.add('div-pages');
    divPages.textContent = book.pages;
    divBook.appendChild(divPages);

    libraryContainer.appendChild(divBook);
}

addButton.addEventListener('click', renderAddBookForm);
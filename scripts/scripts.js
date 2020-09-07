//initial declarations
let libraryContainer = document.querySelector('#library-container')
let addButton = document.querySelector('#add-button');
let myLibrary = [];

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     // this.info = function() {
//     //     return `${title} by ${author}, ${pages} pages, ${read ? ' has already read' : ' not read yet'}`
//     // }
// }

class Book {
    constructor(title, author, pages, read) {
        this.titleValue = title;
        this.authorValue = author;
        this.pagesValue = pages;
        this.readValue = read;
    }

    get titleValue() {
        return this.title;
    }

    set titleValue(title) {
        this.title = title;
    }

    get authorValue() {
        return this.author;
    }

    set authorValue(author) {
        this.author = author;
    }

    get pagesValue() {
        return this.pages;
    }

    set pagesValue(pages) {
        this.pages = pages;
    }

    get readValue() {
        return this.read;
    }

    set readValue(read) {
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? ' has already read' : ' not read yet'}`
    }
}

const addBookToLibrary = (form) => {
    console.log(form);
    let titleInput = document.querySelector('#titleInput');
    let authorInput = document.querySelector('#authorInput');
    let pagesInput = document.querySelector('#pagesInput');
    let readCheckbox = document.querySelector('#readCheckbox');
    myLibrary.push(new Book(titleInput.value, authorInput.value, pagesInput.value, readCheckbox.checked));
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    renderLibrary();
}

const renderLibrary = () => {
    libraryContainer.querySelectorAll('*').forEach(node => node.remove());
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (myLibrary) {
        myLibrary.forEach(book => renderBook(book))
    } else {
        myLibrary = [];
    }
}

const renderBook = (book) => {
    let divBook = document.createElement('div');
    divBook.classList.add('div-book');
    if (book.read) {
        divBook.classList.add('read');
    }

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

    let bookActionButtonsDiv = document.createElement('div');
    bookActionButtonsDiv.classList.add('book-action-buttons-div');

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('book-action-button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteBook(book));
    bookActionButtonsDiv.appendChild(deleteButton);

    if (!book.read) {
        let markAsReadButton = document.createElement('button');
        markAsReadButton.innerHTML = 'Mark As Read';
        markAsReadButton.classList.add('book-action-button');
        markAsReadButton.classList.add('mark-as-read-button');
        markAsReadButton.addEventListener('click', () => markBookAsRead(book));
        bookActionButtonsDiv.appendChild(markAsReadButton);
    }
    divBook.appendChild(bookActionButtonsDiv);

    libraryContainer.appendChild(divBook);
}

const deleteBook = (book) => {
    let bookIndex = myLibrary.indexOf(book);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    renderLibrary();
}

const markBookAsRead = (book) => {
    let bookIndex = myLibrary.indexOf(book);
    if (bookIndex !== -1) {
        myLibrary[bookIndex].read = true;
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    renderLibrary();
}

const renderAddBookForm = () => {
    let form = document.createElement('form');
    form.classList.add('book-form');

    let titleInput = document.createElement('input');
    titleInput.id = 'titleInput';
    titleInput.classList.add('book-form-input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    form.appendChild(titleInput);

    let authorInput = document.createElement('input');
    authorInput.id = 'authorInput';
    authorInput.classList.add('book-form-input');
    authorInput.type = 'text';
    authorInput.placeholder = 'Author';
    form.appendChild(authorInput);

    let pagesInput = document.createElement('input');
    pagesInput.id = 'pagesInput';
    pagesInput.classList.add('book-form-input');
    pagesInput.placeholder = 'Number of Pages';
    pagesInput.type = 'number';
    form.appendChild(pagesInput);

    let readCheckbox = document.createElement('input');
    readCheckbox.id = 'readCheckbox';
    readCheckbox.type = 'checkbox';

    let readCheckboxLabel = document.createElement('label');
    readCheckboxLabel.htmlFor = 'readCheckbox';
    readCheckboxLabel.innerHTML = 'I read this book';
    form.appendChild(readCheckboxLabel);
    form.appendChild(readCheckbox);

    let submitButton = document.createElement('input');
    submitButton.classList.add('book-form-submit-button')
    submitButton.type = 'submit';
    submitButton.innerHTML = 'Save';
    submitButton.addEventListener('click', () => addBookToLibrary(form))
    form.appendChild(submitButton);

    libraryContainer.appendChild(form);
}

addButton.addEventListener('click', renderAddBookForm);

renderLibrary();
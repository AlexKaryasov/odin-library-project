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

//todo add classes to form and inputs
const renderAddBookForm = () => {
    let form = document.createElement('form');

    let titleInput = document.createElement('input');
    titleInput.id = 'titleInput';
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    form.appendChild(titleInput);

    let authorInput = document.createElement('input');
    authorInput.id = 'authorInput';
    authorInput.type = 'text';
    authorInput.placeholder = 'Author';
    form.appendChild(authorInput);

    let pagesInput = document.createElement('input');
    pagesInput.id = 'pagesInput';
    pagesInput.placeholder = 'Number of Pages';
    pagesInput.type = 'number';
    form.appendChild(pagesInput);

    let readCheckbox = document.createElement('input');
    readCheckbox.id = 'readCheckbox';
    readCheckbox.type = 'checkbox';
    form.appendChild(readCheckbox);

    let submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.innerHTML = 'Save';
    submitButton.addEventListener('click', () => addBookToLibrary(form))
    form.appendChild(submitButton);

    libraryContainer.appendChild(form);
}

addButton.addEventListener('click', renderAddBookForm);

renderLibrary();
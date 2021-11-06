// array for containing all book objects
myLibrary = [];

/* variable that will help keep track of the index of each book in the array, 
it will be incremented each time a book is added */
let position = 1;

// constructor for new book object
function book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
};


// event listener for new book button, makes form appear
document.querySelector('#newBook button').addEventListener('click', () => {
    document.getElementById('form').style.display = 'block';
});

// event listeners for submit and cancel buttons within add new book form
document.querySelector('#cancelButton').addEventListener('click', () => {
    // hide new book form
    document.getElementById('form').style.display = 'none';
});
document.querySelector('#submitButton').addEventListener('click', () => {
    let title = document.querySelector('#title').value;
    document.querySelector('#title').value = '';
    let author = document.querySelector('#author').value;
    document.querySelector('#author').value = '';
    let pageCount = document.querySelector('#page').value;
    document.querySelector('#page').value = '';
    let read = document.querySelector('#read').value;
    document.querySelector('#read').value = '';
    let newBook = new book(title, author, pageCount, read);
    // hide new book form
    document.getElementById('form').style.display = 'none';
    // add new object to mylibrary array
    myLibrary.push(newBook);
    addBookToLibrary(newBook);
})

// !!!! maybe have function for displaying initial books in library if there are any !!!!


// function that runs when 'add new book' button is clicked, prompts user for book info
function getBookInfo() {
    /* prompt user, multiple input values with placeholder text, need confirm and cancel buttons
    TRY IN HTML FIRST, store info in variables */


    // call constructor function to create new book object, called by confirm button

    // push new object onto 'mylibrary' array

};

function addBookToLibrary(newBook) {
    // create div element for new book
    let newBookDiv = document.createElement('div');
    // add data attribute and class
    newBookDiv.setAttribute('data-key', `${position}`);
    newBookDiv.classList.add('book');
    // populate div with info from object
    for(const key in newBook) {
        let newDiv = document.createElement('div');
        newDiv.textContent = newBook[key];
        newBookDiv.appendChild(newDiv);
    }
    // append book div 
    const bookcase = document.getElementById('bookcase');
    bookcase.appendChild(newBookDiv);
    // also need to append buttons for changing read status and removing book, add 'data-key'

    // increment position variable
    position++;
};
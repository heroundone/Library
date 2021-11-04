myLibrary = [];

/* variable that will help keep track of the index of each book in the array, 
it will be incremented each time a book is added */
let position = 1;

function book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
};

// !!!! maybe have function for displaying initial books in library if there are any !!!!


// function that runs when 'add new book' button is clicked, prompts user for book info
function getBookInfo() {
    // prompt user, store info in variables

    // call constructor function to create new book object

    // push new object onto 'mylibrary' array

};

function addBookToLibrary() {
    // create div element for new book
    let newBook = document.createElement('div');
    // add data attribute and class
    newBook.setAttribute(data-key, `${position}`);
    newBook.classList.add('book');
    // populate div with info from object

    // append book div 

    // also need to append buttons for changing read status and removing book, add 'data-key'

    // increment position variable at end

};
myLibrary = [];

/* variable that will help keep track of the index of each book, it will be incremented 
each time a book is added */
let position = 1;

function book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
};


function addBookToLibrary() {
    // create div element 
    let newBook = document.createElement('div')
};
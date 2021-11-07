// array for containing all book objects
myLibrary = [];

/* variable that will help keep track of the index of each book in the array, 
it will be incremented each time a book is added */
let position = 0;

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

// event listeners for submit and cancel buttons
document.querySelector('#cancelButton').addEventListener('click', () => {
    // hide 'add new book' form
    document.getElementById('form').style.display = 'none';
});
document.querySelector('#submitButton').addEventListener('click', () => {
    // upon submission all data is stored, and all form fields are cleared
    let title = document.querySelector('#title').value;
    document.querySelector('#title').value = '';
    let author = document.querySelector('#author').value;
    document.querySelector('#author').value = '';
    let pageCount = document.querySelector('#page').value;
    document.querySelector('#page').value = '';
    let read = document.querySelector('#read').value;
    document.querySelector('#read').value = '';
    // create new book object
    let newBook = new book(title, author, pageCount, read);
    // hide new book form
    document.getElementById('form').style.display = 'none';
    // add new object to mylibrary array
    myLibrary.push(newBook);
    addBookToLibrary(newBook);
})

// !!!! maybe have function for displaying initial books in library if there are any !!!!


function addBookToLibrary(newBook) {
    // create div element for new book
    let newBookDiv = document.createElement('div');
    // add data attribute and class, then add to array
    newBookDiv.setAttribute('data-key', `${position}`);
    newBookDiv.classList.add('book');
    // populate div with info from object
    for(const key in newBook) {
        let newDiv = document.createElement('div');
        newDiv.textContent = newBook[key];
        newBookDiv.appendChild(newDiv);
    }
    // set up buttons for changing read status and removing book, add 'data-key' attribute
    let newSpan = document.createElement('span');

    let removeButton = document.createElement('button');
    removeButton.setAttribute('data-key', `${position}`);
    removeButton.addEventListener('click', (e) => removeBook(e));
    removeButton.textContent = 'Remove';

    let readStatusButton = document.createElement('button');
    readStatusButton.setAttribute('data-key', `${position}`);
    readStatusButton.textContent = 'Mark as Read/Unread';

    newSpan.appendChild(removeButton);
    newSpan.appendChild(readStatusButton);
    newBookDiv.appendChild(newSpan);

    // append book div 
    const bookcase = document.getElementById('bookcase');
    bookcase.appendChild(newBookDiv);

    // increment position variable
    position++;
};

function removeBook(event) {
    // need array to store the html of each book for modification
    let bookDivs = Array.from(document.querySelectorAll('.book'));

    parent = event.target.parentNode.parentNode;
    indexOfBook = parent.getAttribute('data-key');
    parent.remove();

    // remove the book from both arrays
    myLibrary.splice(indexOfBook, 1);
    bookDivs.splice(indexOfBook, 1);
    position--;
    let i = 0;

    //increment position of books, that are after the deletion, down one
    bookDivs.forEach(div => {
        div.setAttribute('data-key', `${i}`);
        i++
    });
};
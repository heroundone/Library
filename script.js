// array for containing all book objects
myLibrary = [];

/* variable that will help keep track of the index of each book in the array, 
it will be incremented up each time a book is added and down when removed*/
let position = 0;

// Class for new book object
class book {
    constructor(title, author, pageCount, read) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.read = read;
    };

    changeReadStatus() {
    // change read status within the book object
    if (this.read === 'read: yes') {
        this.read = 'read: no';
    }
    else {
        this.read = 'read: yes';
    };
    // change read status on the web page now
    let title = this.title
    let alteredTitle = title.replaceAll(' ', '');
    let readStatus = document.querySelector(`.${alteredTitle} .read`)
    readStatus.textContent = this.read;

    // update local storage
    localStorage.setItem(title, JSON.stringify(theBook));
    };
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
    let pageCount = document.querySelector('#page').value + ' pages';
    document.querySelector('#page').value = '';
    let read = 'read: ' + document.querySelector('#read').value;
    document.querySelector('#read').value = '';
    // create new book object
    let newBook = new book(title, author, pageCount, read);
    // hide new book form
    document.getElementById('form').style.display = 'none';
    // add new object to mylibrary array and put them in local storage
    myLibrary.push(newBook);
    localStorage.setItem(`${title}`, JSON.stringify(newBook));
    addBookToLibrary(newBook);
})

/* use local storage, when page is loaded check if local storage contains anything
if it does populate the page with the books contained within
else do nothing
*/
function displayBooks() {
    for(let key in localStorage) {
        retrievedBook = JSON.parse(localStorage.getItem(key));
        if(retrievedBook != null) {
            // use retrievedBook to construct a new book object, need new constructor 
            // to readd methods to the recovered objects
            class recoveredBook extends book {
                constructor(title, author, pageCount, read) {
                    super(title, author, pageCount, read);
                };
            };
            
            title = retrievedBook['title'];
            author = retrievedBook['author'];
            pageCount = retrievedBook['pageCount'];
            read = retrievedBook['read'];
            let thisBook = new recoveredBook(title, author, pageCount, read);
            
            myLibrary.push(thisBook);
            addBookToLibrary(thisBook);
        };
    };
};

function addBookToLibrary(newBook) {
    // create div element for new book
    let newBookDiv = document.createElement('div');
    // add data attribute and class, then add to array
    newBookDiv.setAttribute('data-key', `${position}`);
    let title = getTitle(position);
    let alteredTitle = title.replaceAll(' ', '');
    newBookDiv.classList.add(alteredTitle);
    newBookDiv.classList.add('book');
    // populate div with info from object
    let i = 0;
    const properties = Object.keys(newBook);
    for(const key in newBook) {
        if(i != properties.length) {
        let newDiv = document.createElement('div');
        newDiv.textContent = newBook[key];
        newDiv.classList.add(`${key}`);
        newBookDiv.appendChild(newDiv);
        i++
        }
    }
    // set up buttons for changing read status and removing book, add 'data-key' attribute
    let newSpan = document.createElement('span');

    let removeButton = document.createElement('button');
    removeButton.setAttribute('data-key', `${position}`);
    removeButton.addEventListener('click', (e) => removeBook(e));
    removeButton.textContent = 'Remove';

    let readStatusButton = document.createElement('button');
    readStatusButton.setAttribute('data-key', `${position}`);
    readStatusButton.addEventListener('click', (e) => getBook(e));
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

    // remove the book from local storage and both arrays 
    objectToDelete = myLibrary[indexOfBook];
    title = objectToDelete['title'];
    localStorage.removeItem(title);

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

function getBook(event) {
    parent = event.target.parentNode.parentNode;
    indexOfBook = parent.getAttribute('data-key');
    theBook = myLibrary[indexOfBook];
    theBook.changeReadStatus();
}

function getTitle(index) {
    theBook = myLibrary[index];
    title = theBook.title;
    return title
}

// check to see if there are books in local storage if so display them on the page
console.log(localStorage);
if(localStorage.length) {
    displayBooks();
};
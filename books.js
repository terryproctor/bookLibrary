let myLibrary = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };
        
    get info() {
        return `${this.title} by ${this.author}, ${this.pages} pages`
    };
    
    addBookToLibrary() {myLibrary.push(this)};
};

// initial books
let charlie = new Book('Charlie and the Chocolate Factory', 'Roal Dahl', 452, true);
charlie.addBookToLibrary();
let eightyFour = new Book('1984', 'Orsen Wells', 655, true);
eightyFour.addBookToLibrary();

let bookContainer = document.getElementsByClassName('bookContainer')[0];

// function where book is displayed in DOM as a div
function displayBooks(item){
    // book box is divs for each box
    let bookBox = document.createElement('div');
    // book containers containers all book
    bookContainer.appendChild(bookBox);
    
    // book is just info for that book
    let book = document.createElement('div');
    book.className = "book";
    book.textContent = item.info;
    book.dataset.value = myLibrary.indexOf(item);
    let delBtn = document.createElement('button');
    delBtn.dataset.value = book.dataset.value; 
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete';
    let readBtn = document.createElement('button');
    readBtn.dataset.value = book.dataset.value; 
    if (item.read === true) {
    readBtn.textContent = 'Read';
    readBtn.className = 'read';
    } else if (item.read === false) {
    readBtn.textContent = 'Not Read';
    readBtn.className = 'notRead';
    }
    bookBox.appendChild(book);
    book.appendChild(readBtn);
    book.appendChild(delBtn);
}

// display all books initially
myLibrary.forEach(displayBooks);

let form = document.querySelector("form");

// submit button
form.addEventListener('submit', function(e){
    e.preventDefault();
    const title = form.querySelector('input[name="title"]').value;
    const author = form.querySelector('input[name="author"]').value;
    const pages = form.querySelector('input[name="pages"]').value;
    const readRadio = form.querySelectorAll('input[name="read"]');
    //check which radio button checked and return boolean
    let selectedRadio;
    for (rBtn of readRadio) {
        if (rBtn.checked) {
            if (rBtn.value === "true") {
            selectedRadio = true; 
            } else {
            selectRadio = Boolean(false);
            }
        
        }
    }
    const read = Boolean(selectedRadio);
    ;
    if (!(title && author && pages)) {
        alert('All fields need to be filled in!');
        return;
    }
    let bookName = `${title}`
    bookName = new Book(title, author, pages, read);
    bookName.addBookToLibrary();
    displayBooks(bookName);
    form.reset();
})


//event listeners for book buttons at top
bookContainer.addEventListener('click', function(e){
    e.preventDefault();
    let target = e.target;
    if (target.className === 'delete') {
        myLibrary.splice(target.dataset.value, 1);
        //remove all child nodes
        bookContainer.querySelectorAll('*').forEach(n => n.remove());
        // refresh all nodes to myLibrary
        myLibrary.forEach(displayBooks);
    }
    if (target.className === 'read') {
        myLibrary[target.dataset.value].read = false;
        target.className = 'notRead';
        target.textContent = 'Not Read';
    } else if (target.className === 'notRead') {
        myLibrary[target.dataset.value].read= true;
        target.className = 'read';
        target.textContent = 'Read';
    }
});

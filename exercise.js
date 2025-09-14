const formButton = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const confirmButton = document.querySelector("#confirmBtn");
const shelf = document.querySelector(".shelf");
const form = document.querySelector("form");
const bookTemplate = document.querySelector(".book.hide");
const body = document.querySelector("body");

//Form elements
const titleInput = document.querySelector("input[name='title']");
const authorInput = document.querySelector("input[name='author']");
const pagesInput = document.querySelector("input[name='pages']");


let myLibrary = [];
displayBooks();

function Book(title,author,pages,isRead){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.isReadText = isRead === 'read' ? ", already read" : ", not read yet";
    this.id = crypto.randomUUID();
    this.info = function(){
        //return (this.title + " by " & this.author & ", " & this.pages & " pages" & this.isReadText);
        return this.title.concat(" by ",this.author,", ",this.pages," pages",this.isReadText);
    };
};

function addBookToLibrary(entry) {
    // take params, create a book then store it in the array
    myLibrary.push(entry);
  }

formButton.addEventListener( "click",(e) => {
    dialog.showModal();
});

dialog.addEventListener("close",(e)=>{
    displayBooks();
    form.reset();
});

confirmButton.addEventListener("click",(e) =>{
    e.preventDefault();
    let formData = new FormData(form);
    let title = formData.get("title");
    let author = formData.get("author");
    let pages = formData.get("pages");
    let status = formData.get("status");
    //check if title or author is empty
    const errorMessageTitle = "Please enter a value for the title.";
    const errorMessageAuthor = "Please enter a value for the author.";
    titleInput.setCustomValidity(title ? "" : errorMessageTitle);
    authorInput.setCustomValidity(author ? "" : errorMessageAuthor);
    if(!form.reportValidity()){
        return;
    }
    let book = new Book(title,author,pages,status);
    addBookToLibrary(book);
    dialog.close();
});

body.addEventListener("click",(e)=>{
    //Toggle the read status of the book if the status button is pressed.
    if(e.target.matches(".book span")){
        e.target.parentElement.parentElement.classList.toggle("read");
        e.target.parentElement.parentElement.classList.toggle("unread");
    };
    //To delete the book if its trash icon is pressed.
    if(e.target.closest(".trash-icon")){
        bookIdToDelete = e.target.parentElement.parentElement.getAttribute("UUID");
        myLibrary = myLibrary.filter(ele => ele.id != bookIdToDelete);
        bookToDelete = shelf.querySelector(`[UUID = "${bookIdToDelete}"]`);
        shelf.removeChild(bookToDelete);
    };
});

function displayBooks(){
    //remove all but first book (the template);
    while (shelf.childNodes.length > 1) {
        shelf.removeChild(shelf.lastChild);
    }
    for(let i = 0; i < myLibrary.length; i++){
        entry = myLibrary[i];
        bookToDisplay = bookTemplate.cloneNode(true);
        bookToDisplay.querySelector(".book-title").textContent = entry.title;
        bookToDisplay.querySelector(".book-author").textContent = entry.author;
        bookToDisplay.querySelector(".book-pages").textContent = entry.pages.toString() + " pages";
        //The default status of the template book element is "unread"
        if(entry.isRead === 'read'){
            bookToDisplay.classList.toggle("read");
            bookToDisplay.classList.toggle("unread");
        }
        bookToDisplay.classList.toggle("hide");
        bookToDisplay.setAttribute("UUID",entry.id);
        shelf.appendChild(bookToDisplay);
    }
};
const formButton = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const confirmButton = document.querySelector("#confirmBtn");
const readToggle = document.querySelector(".shelf");

//Form elements
const titleInput = document.querySelector("input[name='title'");
const authorInput = document.querySelector("input[name='author'");
const pagesInput = document.querySelector("input[name='pages'");


const myLibrary = [];

function Book(title,author,pages,isRead){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.isReadText = isRead ? ", already read" : ", not read yet";
    this.info = function(){
        //return (this.title + " by " & this.author & ", " & this.pages & " pages" & this.isReadText);
        return this.title.concat(" by ",this.author,", ",this.pages," pages",this.isReadText);
    };
};

function addBookToLibrary() {
    // take params, create a book then store it in the array
  }

formButton.addEventListener( "click",(e) => {
    dialog.showModal();
});

dialog.addEventListener("close",(e)=>{
    console.log("closing");
});

confirmButton.addEventListener("click",(e) =>{
    e.preventDefault();
    book = new Book()
    dialog.close();
});

readToggle.addEventListener("click",(e)=>{
    if(e.target.matches(".book span")){
        console.log("correctly selected");
        e.target.parentElement.classList.toggle("read");
        e.target.parentElement.classList.toggle("unread");
    }


});
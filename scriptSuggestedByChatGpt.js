class Book {
  constructor(id, title, author, isRead = "unread") {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }

  toggleRead() {
    this.isRead = this.isRead === "read" ? "unread" : "read";
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.render();
  }

  removeBook(id) {
    this.books = this.books.filter((b) => b.id !== id);
    this.render();
  }

  toggleBook(id) {
    const book = this.books.find((b) => b.id === id);
    if (book) {
      book.toggleRead(); // delegate to Book
      this.render();
    }
  }

  render() {
    console.clear();
    console.log("Library:");
    this.books.forEach((book) => {
      console.log(`${book.title} by ${book.author} [${book.isRead}]`);
    });
  }
}

// Example usage:
const lib = new Library();

const book1 = new Book(1, "1984", "George Orwell");
const book2 = new Book(2, "The Hobbit", "J.R.R. Tolkien", "read");

lib.addBook(book1);
lib.addBook(book2);

lib.toggleBook(1); // 1984 will flip from unread → read

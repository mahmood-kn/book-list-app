class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book) {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }

  clearInputs() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  showMessage(msg, className) {
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  removeBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
      const ui = new UI();
      ui.showMessage("Book Removed!", "success");

      let books;
      if (localStorage.getItem("books") === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem("books"));
      }

      books.forEach((book, index) => {
        if (book.isbn === target.parentElement.parentElement.children[2].textContent) {
          books.splice(index, 1);
          localStorage.setItem("books", JSON.stringify(books));
        }
      });
    }
  }
}

document.querySelector("#book-form").addEventListener("submit", (e) => {
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showMessage(`Please input values`, "error");
  } else {
    ui.showMessage(`Book Added!`, "success");

    ui.addBook(book);
  }

  ui.clearInputs();

  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.removeBook(e.target);
});

document.addEventListener("DOMContentLoaded", () => {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.forEach((book) => {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  });
});

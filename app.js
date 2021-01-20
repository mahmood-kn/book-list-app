function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addToList = function (book) {
  const list = document.querySelector("#book-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

UI.prototype.showMessage = function (msg, className) {
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));

  container.insertBefore(div, form);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.removeBook = function (target) {
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    const ui = new UI();
    ui.showMessage("Book Removed!", "success");
  }
};

document.querySelector("#book-form").addEventListener("submit", (e) => {
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showMessage(`Please input values`, "error");
  } else {
    ui.addToList(book);

    ui.showMessage(`Book Added!`, "success");
  }

  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.removeBook(e.target);
});

const myLibrary = [];

if (myLibrary.length === 0) {
  addBookToLibrary("Jane Austen", "Pride and Prejudice", 432, true);
  addBookToLibrary("F, Scott Fitzgerald", "The Great Gatsby", 218, false);
  addBookToLibrary("George Orwell", "1900", 328, false);
}

//logica para guardar los libros y mostrar en pantalla

function Book(id, author, title, pages, read) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function getUniqueId() {
  let id;
  do {
    id = crypto.randomUUID();
  } while (myLibrary.some((book) => book.id === id));

  return id;
}

function addBookToLibrary(author, title, pages, read) {
  const id = getUniqueId();
  const newBook = new Book(id, author, title, pages, read);
  myLibrary.push(newBook);
}

const tbody = document.querySelector(".tbody");
let position = 1;

function showBooks(book) {
  const btn = document.createElement("button");
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  const bookId = document.createElement("td");
  bookId.setAttribute("data-label", "ID");
  bookId.textContent = position;

  const bookAuthor = document.createElement("td");
  bookAuthor.setAttribute("data-label", "Author");
  bookAuthor.textContent = book.author;

  const bookTitle = document.createElement("td");
  bookTitle.setAttribute("data-label", "Title");
  bookTitle.textContent = book.title;

  const bookPages = document.createElement("td");
  bookPages.setAttribute("data-label", "Pages");
  bookPages.textContent = book.pages;

  const bookRead = document.createElement("td");
  bookRead.setAttribute("data-label", "Read Status");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", `Read status for "${book.title}"`);
  checkbox.checked = book.read;
  bookRead.appendChild(checkbox);

  const bookDeleteBtn = document.createElement("td");
  bookDeleteBtn.setAttribute("data-label", "Delete Books");
  btn.textContent = "Delete";
  btn.classList.add("delete-btn");
  btn.addEventListener("click", () => {
    tr.remove();
  });

  bookDeleteBtn.appendChild(btn);
  tr.appendChild(bookId);
  tr.appendChild(bookAuthor);
  tr.appendChild(bookTitle);
  tr.appendChild(bookPages);
  tr.appendChild(bookRead);
  tr.appendChild(bookDeleteBtn);
  position++;
}

function renderBooks() {
  tbody.innerHTML = "";
  position = 1;
  myLibrary.map((book) => showBooks(book));
}

myLibrary.map((book) => showBooks(book));

//logica para obtener los datos del libro

const dialog = document.querySelector("dialog");
const closebtn = dialog.querySelector("button");
const addBookBtn = document.querySelector("#addBookBtn");

function closeDialogWithAnimation() {
  dialog.classList.add("closing");

  setTimeout(() => {
    dialog.classList.remove("closing");
    dialog.close();
  }, 300);
}

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closebtn.addEventListener("click", () => {
  closeDialogWithAnimation();
});

const formBook = document.querySelector("#bookForm");

formBook.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = document.querySelector("#author").value;
  const title = document.querySelector("#title").value;
  const pages = document.querySelector("#pages").value;
  const readStatus = document.querySelector("#read").checked;

  let repeatTitle = false;
  for (let book of myLibrary) {
    if (author === book.author && title === book.title) {
      showAlert(
        `The title ${title} by the author ${author}, is already repeated`
      );
      repeatTitle = true;
      break;
    }
  }

  if (!repeatTitle) {
    addBookToLibrary(author, title, pages, readStatus);
    renderBooks();
    formBook.reset();
    showEverythingInOrder(`The book was saved successfully`);
    closeDialogWithAnimation();
  }
});

function showAlert(message, duration = 3000) {
  const alertBox = document.getElementById("custom-alert");

  alertBox.textContent = message;
  alertBox.classList.remove("hidden");
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 300);
  }, duration);
}

function showEverythingInOrder(message, duration = 3000) {
  const everythingInOrder = document.getElementById(
    "custom-everything-in-order"
  );

  everythingInOrder.textContent = message;
  everythingInOrder.classList.remove("hidden");
  everythingInOrder.classList.add("show");

  setTimeout(() => {
    everythingInOrder.classList.remove("show");
    setTimeout(() => {
      everythingInOrder.classList.add("hidden");
    }, 300);
  }, duration);
}

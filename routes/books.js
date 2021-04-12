var express = require("express");
var router = express.Router();

let books = [
  {
    title: "Där kräftorna sjunger",
    author: "Delia Owens",
    pages: 369,
    rented: true,
    id: 1,
  },
  {
    title: " Städa hållbart med Ekotipset : husmorsknep och ekohacks",
    author: "Ellinor Sirén",
    pages: 200,
    rented: false,
    id: 2,
  },
  {
    title: "Järnmärkt",
    author: "Helén Wigh",
    pages: 384,
    rented: false,
    id: 3,
  },
  {
    title: "I hjärtat av Ådala",
    author: "Åsa Liabäck",
    pages: 274,
    rented: false,
    id: 4,
  },
  {
    title: "Vingar av silver",
    author: "Camilla Läckberg",
    pages: 323,
    rented: false,
    id: 5,
  },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  let printBooks = `<div> <h2>Kimmies bibliotek</h2>`;

  for (book in books) {
    printBooks += `<h3><a href="/book/:${books[book].id}">${books[book].title}</a> || ${books[book].author}</h3>`;

    if (books[book].rented == true) {
      printBooks += `<p>Utlånad</p>`;
    } else if (books[book].rented == false) {
      printBooks += `<button><a href="/books/book/:${books[book].id}">Tillgänglig</a></button>`;
    }
  }

  printBooks += `<div><a href="/books/add">Lägg till ny bok</a></div>`;

  console.log(books);

  res.send(printBooks);
});

router.get("/add", (req, res) => {
  let addForm = `<div><h2>Lägg till en ny bok</h2>
                <form action="/books/add" method="post">
                  <input type="text" name="title" placeholder="Titel..">
                  <input type="text" name="author" placeholder="Författare..">
                  <input type="text" name="pages" placeholder="Antal sidor..">
                  <button type="submit">Spara</button>
                </form></div>
                `;

  res.send(addForm);
});

router.post("/add", (req, res) => {
  console.log(req.body);

  let newBookId = books.lenght++;

  let newBook = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    rented: false,
    id: newBookId,
  };

  books.push(newBook);

  res.redirect("/books");
});

router.get("/book/:id", (req, res) => {
  let showBook = req.params.id;

  let bookDetails = `<fieldset>`;

  for (book in books) {
    if (books[book].id == showBook) {
      bookDetails += `
                  <legend>${books[book].title}</legend>
                  <h4>${books[book].author}</h4>
                  <p>${books[book].pages}</p>`;

      if (books[book].rented == true) {
        bookDetails += `<p>Utlånad</p>`;
      } else if (books[book].rented == false) {
        bookDetails += `<button><a href="/books/:${books[book].id}">Låna/Lämna tillbaka</a></button>`;
      }
    }
  }

  bookDetails += `</fieldset>`;

  res.send(bookDetails);
});

module.exports = router;

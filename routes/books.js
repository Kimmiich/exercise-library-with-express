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
    title: " Städa hållbart med Ekotipset",
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

let htmlHead = `<link rel="stylesheet" href="/stylesheets/style.css"></link>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Oswald&family=Raleway&display=swap" rel="stylesheet">`;

/* GET users listing. */
router.get("/", function (req, res, next) {
  let printBooks = `<title>Library</title>${htmlHead}
    <section><header class="header"><h2>Kimmies bibliotek</h2><a href="/books/add" class="addBook">Lägg till ny bok</a></header><hr class="rounded">`;

  for (book in books) {
    printBooks += `<article><h3><a class="bookTitles" href="/books/book/${books[book].id}">${books[book].title}</a> || ${books[book].author}</h3>`;

    if (books[book].rented == true) {
      printBooks += `<p>Utlånad</p></article>`;
    } else if (books[book].rented == false) {
      printBooks += `<button><a href="/books/book/${books[book].id}">Tillgänglig</a></button></article>`;
    }
  }

  printBooks += `</section>`;

  res.send(printBooks);
});

router.get("/add", (req, res) => {
  let addForm = `<title>Library - New book</title>${htmlHead}<div><h2>Lägg till en ny bok</h2>
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

  let newBookId = books.length + 1;

  let newBook = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    rented: false,
    id: newBookId,
  };

  books.push(newBook);
  console.log(books);

  res.redirect("/books");
});

router.get("/book/:id", (req, res) => {
  let showBook = req.params.id;

  let bookDetails = `<title>Library - Book</title>${htmlHead}<fieldset>`;

  for (book in books) {
    if (books[book].id == showBook) {
      bookDetails += `
                  <legend>${books[book].title}</legend>
                  <p>Författare: ${books[book].author}</p>
                  <p>Antal sidor: ${books[book].pages}</p>`;

      if (books[book].rented == true) {
        bookDetails += `<p>Utlånad || <a href="/books/rent/${books[book].id}">Lämna tillbaka</a></p>`;
      } else if (books[book].rented == false) {
        bookDetails += `<a href="/books/rent/${books[book].id}">Låna</a>`;
      }
    }
  }

  bookDetails += `</fieldset>`;

  res.send(bookDetails);
});

router.get("/rent/:id", (req, res) => {
  console.log(req.body);

  let showBook = req.params.id;
  for (book in books) {
    if (books[book].id == showBook) {
      if (books[book].rented == true) {
        books[book].rented = false;
      } else if (books[book].rented == false) {
        books[book].rented = true;
      }
    }
  }

  res.redirect("/books");
});

module.exports = router;

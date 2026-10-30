import express, { json } from "express";

const app = express();
app.use(json());
const port = 3000;

const books = [
  { id: 1, title: "Гарри Поттер" },
  { id: 2, title: "Властелин колец" },
  { id: 3, title: "Голодные игры" },
];

app.listen(port, () => {
  console.log(`server is workingon http://localhost:${port}`);
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const newBook = {
    id: Date.now(),
    title: req.body.title,
  };
  books.push(newBook);
  res.json(newBook);
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex].title = req.body.title;
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

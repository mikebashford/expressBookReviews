const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", async (req, res) => {
  //Write your code here
  try {
    const booksPromise = new Promise((resolve, reject) => {
      resolve(books);
    });
    const bookList = await booksPromise;
    res.send(JSON.stringify({ books }, null, 4));
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  //Write your code here
  try {
    const isbn = req.params.isbn;
    const booksPromise = new Promise((resolve, reject) => {
      const book = books[isbn];
      resolve(book);
    });

    const book = books[isbn];
    if (book) {
      res.send(book);
    } else {
      return res
        .status(300)
        .json({ message: `No books found by this ISBN ${isbn}` });
    }
  } catch (error) {
    res.status(500).send("Error fetching book");
  }
});

// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  //Write your code here
  try {
    const author = req.params.author;
    const booksPromise = new Promise((resolve, reject) => {
      const bookList = books[author];
      resolve(bookList);
    });
    const booksFound = [];
    for (const key in books) {
      const book = books[key];
      if (book.author === author) {
        booksFound.push(book);
      }
    }
    if (booksFound.length > 0) {
      return res.send(booksFound);
    } else {
      return res
        .status(300)
        .json({ message: `No books found by this author ${author}` });
    }
  } catch (error) {
    res.status(500).send("Error fetching books by this author");
  }
});

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  //Write your code here
  try {
    const title = req.params.title;
    const booksPromise = new Promise((resolve, reject) => {
      const book = books[title];
      resolve(book);
    });
    const booksFound = [];
    for (const key in books) {
      const book = books[key];
      if (book.title === title) {
        booksFound.push(book);
      }
    }
    if (booksFound.length > 0) {
      return res.send(booksFound);
    } else {
      return res
        .status(300)
        .json({ message: `No books found by this title ${title}` });
    }
  } catch (error) {
    res.status(500).send("Error fetching books with this title");
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const booksFound = [];
  for (const key in books) {
    const book = books[key];
    if (book.isbn === isbn) {
      booksFound.push(book);
    }
  }
  if (booksFound.length > 0) {
    return res.send(booksFound);
  } else {
    return res
      .status(300)
      .json({ message: `No reviews for this book found by this isbn ${isbn}` });
  }
});

module.exports.general = public_users;

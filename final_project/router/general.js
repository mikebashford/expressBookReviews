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
public_users.get("/", function (req, res) {
  //Write your code here
  return res.send(bookList());
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.key;
  // if (bookFilter.length > 0) {
  //   res.send(bookFilter);
  // } else {
  //   return res.status(300).json({ message: "No books found by this ISBN" });
  // }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  // if () {
  //   return res.send();
  // } else {
  return res.status(300).json({ message: "No books found by this author" });
  // }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  // if () {
  //   return res.send();
  // } else {
  return res.status(300).json({ message: "No books found by this title" });
  // }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const reviews = req.params.reviews;
  if (book.reviews === "") {
    return res.send(book.reviews);
  } else {
    return res.status(300).json("No reviews available");
  }
});

module.exports.general = public_users;

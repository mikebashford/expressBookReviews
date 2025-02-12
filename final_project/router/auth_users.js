const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  const userIsRegistered = users.find((user) => user.username === username);
  if (userIsRegistered) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({ message: "ERROR SIGNING IN" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let bookFound = books[isbn];
  if (bookFound) {
    let review = req.query.review;
    let reviewer = req.session.authorization["username"];
    if (review) {
      bookFound["reviews"][reviewer] = review;
      books[isbn] = bookFound;
    }
    res.send(
      `The review for the book with ISBN  ${isbn} has been added/updated.`
    );
  } else {
    res.send("Unable to find this ISBN!");
  }
});

//Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let bookFound = books[isbn];
  if (bookFound) {
    let review = req.query.review;
    let reviewer = req.session.authorization["username"];
    if (review) {
      bookFound["reviews"][reviewer] = review;
      books[isbn] = "";
    }
    res.send(`The review for the book with ISBN  ${isbn} has been deleted.`);
  } else {
    res.send("Unable to find this ISBN!");
  }
});

console.log(users);
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

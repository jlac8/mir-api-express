# Make It Real - MY FIRST API WITH EXPRESS

This is a solution to the "My first API with Express" project of the Make It Real course. The goal of this project was to build a simple API with Express to gain practical experience with server-side development.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

The challenge was to implement a basic API using Node.js and Express, which provides various CRUD operations for managing a phonebook. Key tasks included:

- Implementing a RESTful API to return a list of contacts from http://localhost:3001/api/people

- Running the application using the command npm start.

- Providing a development command npm run dev to start the server and watch for changes.

- Creating an informational page at http://localhost:3001/info.

- Retrieving details of a specific contact by ID, e.g., http://localhost:3001/api/people/5, and responding with the appropriate status code if the contact does not exist.

- Implementing a DELETE endpoint to remove a contact from the phonebook.

- Adding the ability to create new entries via HTTP POST requests at http://localhost:3001/api/people.

- Handling errors when creating new entries, such as:

  - Missing name or number.

  - The name already exists in the phonebook.

- Adding and configuring the morgan middleware to log HTTP requests, including displaying data for POST requests.

## My process

### Built with

- Node.js (npm init)
- Typescript (tsx, tsc-init)
- Express
- Morgan
- Endpoints

### Features

GET /api/people: Fetch all contacts.

GET /api/people/:id: Fetch a single contact by ID.

POST /api/people: Add a new contact.

DELETE /api/people/:id: Delete a contact by ID.

Info Page /info: Displays the number of contacts and server time.

### What I learned

Express Middleware: Using express.json() to parse JSON payloads and understanding how middleware helps in handling requests and responses.

Morgan Logging: Leveraging morgan to log HTTP requests, including creating custom tokens for additional information, such as logging the request body for POST requests.

```js
morgan.token("body", (req: Request) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  // tiny format: The minimal output.
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
```

### Continued development

Implementing CORS (cors middleware) to handle requests from different domains.

Adding support for URL-encoded payloads using express.urlencoded() for handling form submissions.

Extending the API to connect to a database like MongoDB to persist the data.

### Useful resources

- [Morgan Doc](https://github.com/expressjs/morgan) - This helped me for understand how to use morgan and create custom tokens to log specific parts of requests.

## Author

- Linkedin - [Juan Alva](https://www.linkedin.com/in/juan-luis-alva/)

## Acknowledgments

Make It Real - Thanks for the project challenge and the support provided throughout the course.

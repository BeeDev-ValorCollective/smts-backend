// SUMMARY:
// The server.js file initializes the Express app, loads environment variables, sets up middleware, and integrates the mail routes.
// It listens for requests on the port specified in the .env file.


//IMPORT REQUIRED MODULES
const express = require("express"); // Express framework for building web applications
const cors = require("cors"); // CORS middleware for handling cross-origin requests
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const app = express(); // Initialize an Express application

// LOAD ENVIRONMENT VARIABLES FROM .ENV FILE
require("dotenv").config(); // Load environment variables from a .env file

// MIDDLEWARE CONFIG
app.use(
  cookieParser(), // Parse cookies in incoming requests
  express.json(), // Parse incoming JSON data
  express.urlencoded({ extended: true }), // Parse URL-encoded data (extended allows richer objects)
  cors({ 
    credentials: true, // Enable credentials (cookies, authorization headers)
    origin: process.env.NODE_ENV === 'development'
      ? process.env.FRONTEND_DEV_ORIGIN // Use development origin from .env
      : process.env.FRONTEND_ORIGIN // Use production origin from .env
  })
);

// IMPORT AND USE MAIL ROUTES
const mailRoutes = require("./routes/mail.routes"); // Import mail-related routes
app.use('/api', mailRoutes); // Prefix mail routes with '/api'

// START THE SERVER AND LISTEN ON SPECIFIED PORT
app.listen(process.env.PORT, () => {
  console.log(`Seniors Mobile Tax Services Going To Port: ${process.env.PORT}`); // Log when the server starts
});

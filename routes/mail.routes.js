// SUMMARY:
// The mail.routes.js file defines the routes for handling mail-related requests.
// It maps a POST request to /sendMail to the sendMail function in the controller.

const express = require('express'); // Import Express module for routing
const { sendMail } = require('../controllers/mail.controller'); // Import the sendMail function from the controller
const router = express.Router(); // Create a new Express router

// Define the route for sending mail
router.post('/sendMail', sendMail); // POST request to /api/sendMail triggers sendMail function

module.exports = router; // Export the router so it can be used in server.js

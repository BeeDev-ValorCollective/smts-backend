// SUMMARY:
// The mail.routes.js file defines the routes for handling mail-related requests.
// It maps a POST request to /sendMail to the sendMail function in the controller.

const express = require('express'); // Import Express module for routing
const { sendContactMail } = require('../controllers/contactMail.controller'); // Import the sendMail function from the controller
const { sendUnsubMail } = require('../controllers/unsubMail.controller')
const router = express.Router(); // Create a new Express router

// Define the route for sending mail
router.post('/sendContactMail', sendContactMail); // POST request to /api/sendMail triggers sendMail function
router.post('/sendUnsubMail', sendUnsubMail)

module.exports = router; // Export the router so it can be used in server.js

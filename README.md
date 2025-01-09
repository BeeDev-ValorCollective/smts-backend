# smts-backend

## This backend is for support of the nodemailer system for use with the 'on page' contact form on the SMTS frontend app.

<hr/>

### Flow Summary:
The client sends a POST request to /api/sendMail with the necessary data (subject, message, contact, and userName).

The route defined in routes/mail.routes.js delegates the request to the sendMail function in the controller (mail.controller.js).

In the controller:
The MailModel is populated with the request data.
The Nodemailer transporter is set up to send the email.
The email is sent to both the admin and the provided contact.
The response is sent back to the client, indicating whether the email was successfully sent.
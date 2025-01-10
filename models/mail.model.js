// Summary:
// The MailModel class is used to structure the data for the email.
// It contains the properties: subject, message, contact, and userName.


class MailModel { 
    constructor({ subject, message, contact, userName }) {
        // Initialize the mail data with the required fields
        this.subject = subject; // The subject of the email
        this.message = message; // The message content of the email
        this.contact = contact; // The contact email to send the email to
        this.userName = userName; // The sender's name
    }
}

module.exports = MailModel; // Export the MailModel class for use in the controller


class MailModel {
    constructor({ subject, message, contact, userName }) {
        this.subject = subject;
        this.message = message;
        this.contact = contact;
        this.userName = userName;
    }
}

module.exports = MailModel;
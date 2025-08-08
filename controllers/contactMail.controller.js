// Summary:
// The sendMail controller function handles the core logic for sending emails.
// It sets up a Nodemailer transporter, formats the email with a logo and HTML content, and sends the email to the provided contact and the admin.
// It responds with a success or error message depending on whether the email was sent successfully.

const nodemailer = require('nodemailer'); // Import Nodemailer for sending emails
const MailModel = require('../models/mail.model'); // Import the MailModel for structured data
const path = require('path'); // Path module for resolving file paths
const smts_logo = path.join(__dirname, '../assets/SMTS_Icon.png'); // Path to the SMTS logo

// Function to send mail
const sendContactMail = async (req, res) => {
    const { subject, message, contact, userName } = req.body; // Extract data from request body

    const mailData = new MailModel({ subject, message, contact, userName }); // Create a new MailModel instance with the request data

    console.log('CONTACT_EMAIL_USER:', process.env.CONTACT_EMAIL);
    console.log('CONTACT_EMAIL_PASS:', process.env.CONTACT_EMAIL ? '********' : 'MISSING');

    try {
        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // Use secure SMTP
            auth: {
                user: process.env.CONTACT_EMAIL_USER, // Email user from .env
                pass: process.env.CONTACT_EMAIL_PASS, // Email password from .env
            },
            logger: true, // Enable logging for debugging
            debug: process.env.NODE_ENV === 'development' // Enable debug for troubleshooting
                ? true 
                : false 
        });

        // Define the mail options (content and attachments)
        const mailOptions = {
            from: process.env.CONTACT_EMAIL_USER, // Sender's email (must match the auth email)
            to: process.env.CONTACT_EMAIL_USER, // Recipient (also the sender for this case)
            bcc: mailData.contact, // Optionally send a copy to the client (contact email)
            subject: `Seniors Mobile Tax Services Message Confirmation - Email from ${ mailData.userName } | ${ mailData.subject }`, // Email subject
            html: // Email HTML content (email body structure)
                `
                <body style="background-color: black; margin: 0; padding: 0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: black; border-collapse: collapse; max-width: 1000px; margin: auto;">
                        <tr>
                            <td>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #3C3B6E;">
                                    <tr>
                                        <td style="padding: 10px; text-align: left;">
                                            <a href=${ process.env.SMTS_Link }>
                                                <img src="cid:smts_logo" alt="SMTS Icon" style="height: 80px; background-color: #DDDDE0; border-radius: 50%; padding: 2px;">
                                            </a>
                                        </td>
                                        <td style="padding: 10px; text-align: right;">
                                            <p style="color: #DDDDE0; font-size: 1rem;">Visit <a href=${ process.env.SMTS_Link } style="text-decoration: underline; color: #DDDDE0;"> Seniors Mobile Tax Services</a></p>
                                            <p style="font-size: 0.65rem; text-align: end; color: #DDDDE0;">
                                                Don't drive... Make the call to Seniors Mobile Tax Services
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #DDDDE0;">
                                    <tr>
                                        <td style="padding: 16px;">
                                            <div style="text-align: center;">
                                                <p style="font-size: 0.9rem; margin: 16px auto; width:80%; color: #3C3B6E; min-width: 280px;">Email confirmation from: <br> Seniors Mobile Tax Services <br> We will respond within 1-2 business days</p>
                                                <h5 style="font-size: 1.3rem; margin: 8px 0 0 0; color: #3C3B6E;">Message received from:</h5>
                                                <p style="font-size: 1.1rem; margin: 0 0 16px 0; color: #3C3B6E;">${ mailData.userName }</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 16px;">
                                            <div style="text-align: center;">
                                                <h5 style="font-size: 1.3rem; margin: 8px 0 0 0; color: #3C3B6E;">Contact Email:</h5>
                                                <p style="font-size: 1.1rem; margin: 0 0 16px 0; color: #3C3B6E;">${ mailData.contact }</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 16px;">
                                            <div style="text-align: center;">
                                                <h5 style="font-size: 1.3rem; margin: 8px 0 0 0; color: #3C3B6E;">Subject:</h5>
                                                <p style="font-size: 1.1rem; margin: 0 0 16px 0; color: #3C3B6E;">${ mailData.subject }</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 16px;">
                                            <div style="text-align: center;">
                                                <h5 style="font-size: 1.3rem; margin: 8px 0 0 0; color: #3C3B6E;">Message:</h5>
                                                <p style="font-size: 1.1rem; margin: 0 auto 16px; max-width: 300px; color: #3C3B6E;">${ mailData.message }</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px;">
                                            <hr style="width: 95%; margin: 24px auto; border: 2px solid #AA2B34;">
                                            <h5 style="margin: 0; padding: 0 8px; color: #3C3B6E;">Don't miss out!</h5>
                                            <p style="font-size: .8rem ;margin: 8px auto; padding: 0 8px; width:95%; color: #3C3B6E;">To ensure our messages find their way into your inbox, make sure to add our mailing provider <a href="mailto:info@beedev-services.com=Request%20For%Support&body=Hello,%0A%0AI%20would%20like%20to%20support%20on...">beedev-services.com</a> and <a href="mailto:thad.a.jones@comcast.net?subject=Request%20For%20Tax%20Services&body=Hello,%0A%0AI%20would%20like%20to%20inquire%20about...">thad.a.jones@comcast.net</a> to your mailing list. This way, we can keep the communications going without any interruptions!</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px;">
                                            <hr style="width: 95%; margin: 8px auto 24px; border: 2px solid #AA2B34;">
                                            <h5 style="margin: 0; padding: 0 8px; color: #3C3B6E;">Disclaimer:</h5>
                                            <p style="font-size: .8rem ;margin: 8px auto; padding: 0 8px; width:95%; color: #3C3B6E;">This email was intended for ${ mailData.userName } (${ mailData.contact }). If you are not the intended recipient of this email, please notify the sender immediately by replying to this message and delete this email from your inbox. Any unauthorized use, disclosure, or distribution of this email is prohibited. Thank you for your understanding.</p>
                                            <p style="font-size: .8rem ;margin: 8px auto; padding: 0 8px; width:95%; color: #3C3B6E;">If you wish to unsubscribe from future emails please visit <a href=${ process.env.SMTS_Link }/unsubscribe>${ process.env.SMTS_Link }/unsubscribe</a> to have your information removed.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                `,
            attachments: [
                {
                    filename: 'logo_light.png', // Attachment file name
                    path: smts_logo, // Path to the attachment
                    cid: 'smts_logo' // Content-ID for embedding the logo image in the email
                }
            ]
        };

 // Send the email using Nodemailer
 await transporter.sendMail(mailOptions);
 console.log("200 - Email Sent Successfully"); // Log success
 return res.status(200).json({ message: "Email Sent Successfully" }); // Respond with success
} catch (error) {
 console.error("500 - Failed to Send Email", error); // Log any errors
 return res.status(500).json({ message: `Failed to send email: ${ error.message }` }); // Respond with failure
}
};

module.exports = { sendContactMail }; // Export the sendMail function for use in routes
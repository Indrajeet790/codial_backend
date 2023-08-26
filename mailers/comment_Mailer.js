const nodeMailer = require("../config/nodemailer");
require("dotenv").config();

// This is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');
    // console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from: process.env.FROM_EMAIL, // sender address
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
};

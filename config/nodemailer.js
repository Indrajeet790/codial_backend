const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();
const transporter = nodemailer.createTransport({
//   service: "gmail",
host: 'smtp.ethereal.email',
  port: 587,
//   secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.USER,
    pass: process.env.PASSWORD
  },
});

const renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template",err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
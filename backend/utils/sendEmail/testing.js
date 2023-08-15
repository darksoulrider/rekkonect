import nodemailer from "nodemailer";
import { emails } from "./email.js";

const sendVerifyEmail = (email, transport) => {
  const mailOptions = {
    from: "Testing  emails",
    to: "agilemack@gmail.com",
    subject:
      "Get Ready to Go from Ordinary to Extraordinary with Mentor Konnect!",
    html: `
      <!-- Your email content here -->
      <h1>testing  emails </h1>
    `,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Failed to send email = " + email);
      console.log("Error =>", error);
    } else {
      console.log("Sent successfully email = " + email);
    }
  });
};

const main = () => {
  //   const transport = nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: "mukesh.inventiway@gmail.com",
  //       pass: "nkdgmzhoytybkfhz", // testing another pass
  //       //   pass: "Snqgotlahnjnpbnz",
  //     },
  //   });

  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "reachus@rekonnect.in",
      pass: "glhfbcqbcmfymefx",
    },
  });
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let count = 0;
  const sendEmailsSequentially = async () => {
    for (let email of emails) {
      sendVerifyEmail(email, transport);
      await delay(4000);
      count++;
      console.log(count);
      break;
    }

    // After all emails are sent, manually close the transport to release resources.
    transport.close();
  };

  sendEmailsSequentially();
};

main();

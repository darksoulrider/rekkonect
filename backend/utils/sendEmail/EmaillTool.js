import nodemailer from "nodemailer";
import fs from "fs";
import { emails } from "./email.js";

let unsent = [];

const sendVerifyEmail = async (email_2, transport) => {
  // const pass = process.env.PASS;
  // const email = process.env.EMAIL;

  // let email_to = email_2;
  await delay(4000);
  try {
    let info = transport.sendMail({
      FROM: "reachus@rekonnect.in",
      // to: email_to,
      to: "agilemack@gmail.com",
      subject:
        "Get Ready to Go from Ordinary to Extraordinary with Mentor Konnect!",
      html: `
    
      <div style="display:flex;  justify-content:center;">
        <img style="width:400px; height:400px;" src="https://res.cloudinary.com/dj7rv21dq/image/upload/v1691417672/background_for_email_qpybq8.jpg">
        </div>
      <p>Regards </p>
      <h2 style="color:blue; padding-bottom:10px;">Team Rekonnect </h2
      <div style="display:flex; gap:20px;  ">

        <img style="width:80px; height:80px;" src="https://res.cloudinary.com/dj7rv21dq/image/upload/v1691417795/rekonnect_logo_sttnqo.jpg" >

      </div>
        <p> Visit our website 
          <a href="https://rekonnect.in/"> https://rekonnect.in/ </a> 
        </p>
      
    `,
    });

    if (!info) {
      console.log("Failed to sent email = " + email_2);
      // unsent.push(email_2);
    } else {
      console.log("Sent successfully email = " + email_2);
    }
  } catch (e) {
    console.log("Error occured sending email= " + email_2);
    console.log(`error => ${e.message}`);
    // unsent.push(email_2);
  }
};

let data = 0;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const main_2 = async () => {
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: "mukesh.inventiway@gmail.com",
      // pass: "Snqgotlahnjnpbnz",
      // user: "reachus@rekonnect.in",
      // pass: "tklvafqcnxagevip",
      user: "operations@rekonnect.in",
      pass: "jkvepelhmyjiiool",
    },
    // auth: {
    //   user: "operations@rekonnect.in",
    //   pass: "jkvepelhmyjiiool",
    // },
  });
  await sendVerifyEmail("agilemack@gmail.com", transport);
  // for (let email of emails) {
  //   await delay(4000);
  //   data += 1;
  //   console.log(`Email count => ${data}`);
  //   break;
  // }
};

main_2();
console.log("\n ------------------ Failed Eamils -------------- \n");
console.log(unsent);

// const main = async () => {
//   for (let email of emails) {
//     await sendVerifyEmail(email);
//     data += 1;
//     console.log(`Email count => ${data}`);
//   }
//   if (data == 2554) {
//     console.log("Done Sending all emails....");
//   }
// };
// main();

// let data1 = ["agilemack@gmail.com", "mackrathod014@gmail.com"];
// "nivedita@inventiway.in",
// "aditi@inventiway.in",
// "akanksha.inventiway@gmail.in",
// "rima@inventiway.in",

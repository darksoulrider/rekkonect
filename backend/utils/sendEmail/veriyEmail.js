import nodemailer from "nodemailer";

const sendVerifyEmail = async () => {
  let verifyToken = "jaksjdfkasdf";

  const pass = process.env.PASS;
  const email = process.env.EMAIL;

  let transport = nodemailer.createTransport({
    service: "gmail",
    //  make it from rekonnect auths [ email and pass ]
    auth: {
      user: "mukesh.inventiway@gmail.com",
      pass: "Snqgotlahnjnpbnz",
    },
  });

  let info = await transport.sendMail({
    from: email,
    to: `agilemack@gmail.com`,
    subject: "Varify email address",
    text: `${verifyToken}`,
  });

  if (!info) {
    console.log("failed to verify email ");
  } else {
    console.log("Sucessfully verified");
  }
};
sendVerifyEmail("agilemack@gmail.com");

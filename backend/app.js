// ********* Import the module *******

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// *****************  App configuration ***************
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: "./config/.env" });

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://192.168.0.105:3000",
      "https://391f-45-252-75-248.ngrok-free.ap",
    ],

    // see baseurl is string or not [no variable is allowed]
    credentials: true, // for credentials true
    // origin: "http://192.168.0.104:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// ***** Request routes setup ***********
import userRotues from "./routes/userRoutes.js";
import employeRoutes from "./routes/employerRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import sessionBook from "./routes/sessionbookRoutes.js";
app.use("/api", userRotues);
app.use("/api", employeRoutes); // can add api/employer
app.use("/api", mentorRoutes); // can add api/mentor
app.use("/api", sessionBook); // can add api/sessionbook

// ******** Only for test purpose *************
const data = [
  {
    id: 1,
    phone: "iphone",
  },
  {
    id: 2,
    phone: "love me",
  },
];

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Mukesh is comming here..",
    data: data,
  });
});

// **** global error handling settup ******
import ErrorMiddleware from "./middleware/errorMiddleware.js";
app.use(ErrorMiddleware);

export default app;

/*
! Notes for understanding 
improt path doesn't work for __filename from nodejs
import path from "path"; // to use this we need meta.url and dirname
! const path = require("path"); // if using this then no meta.url needd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename); /// use this without meta.url to check error

*/

//  ! letter you can remvoe this after chekign the log works
// const logDirectory = path.join(__dirname, "logs");
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = fs.createWriteStream(
//   path.join(logDirectory, "access.log"),
//   { flags: "a" }
// );
// app.use(morgan("combined", { stream: accessLogStream }));

// ! if needd =>  think about helemt-csp

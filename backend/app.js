// ********* Import the module *******

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";

// *****************  App configuration ***************
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: "./config/.env" });

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// ***** Request routes setup ***********
import userRotues from "./routes/userRoutes.js";

app.use("/api/", userRotues);

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

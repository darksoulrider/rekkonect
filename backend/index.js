// import ing

import app from "./app.js";
import { Socket } from "socket.io";
import DB_Connect from "./config/database_connect.js";
import cloudinary from "cloudinary";

DB_Connect();

// ********** cloudinary setup  ****************
cloudinary.v2.config({
  cloud_name: "dj7rv21dq",
  api_key: "648296731169788",
  api_secret: "MoMWEDYpDeCBwSBoUEzPJgVfWUk",
});

// ********* Razor pay setup ******************

// const port = process.env.PORT || 9001;
const port = 5002;
app.listen(port, () => {
  console.log("Server started listening on port " + port);
});

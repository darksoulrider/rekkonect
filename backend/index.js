// import ing

import app from "./app.js";
import { Socket } from "socket.io";
import DB_Connect from "./config/database_connect.js";
const port = process.env.PORT || 9001;

DB_Connect();

app.listen(port, () => {
  console.log("Server started listening on port " + port);
});

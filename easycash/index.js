require("dotenv").config();
require("./db");
const app = require("./server");
app.listen(process.env.SERVER_PORT, () =>
  console.log("Server listening on port " + process.env.SERVER_PORT)
);

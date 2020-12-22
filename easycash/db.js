const mongoose = require("mongoose");

// By default, mongoose buffers commands when the connection goes down until the driver manages to
// reconnect. This prevent mongoose from throwing an error even when the database is not connected.
// We disable buffering by setting bufferCommands to false.
mongoose.set("bufferCommands", false);

// connect to database
mongoose
  .connect(`${process.env.DB_URI}`, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connnected to db.");
  })
  .catch((er) => console.log("Error connecting to db: ", er));
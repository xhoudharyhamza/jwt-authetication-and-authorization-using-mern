let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mern-app")
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log(error);
  });

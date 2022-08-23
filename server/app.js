let express = require("express");
require("./database/connection");
const cookieParser = require('cookie-parser')
let app = express();
let router = require("./router/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
require('dotenv').config()
app.use(router);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

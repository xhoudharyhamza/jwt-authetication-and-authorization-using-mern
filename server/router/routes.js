let express = require("express");
let router = express.Router();
let User = require("../model/User");
let bcrypt = require("bcryptjs");
let { authenticate } = require("../middlewares/authMiddlewares");
let jwt = require("jsonwebtoken");
//  route to signup user
router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      let user = new User({ name, email, password });
      user.password = await bcrypt.hash(user.password, 12);
      let token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      user.token = token;
      let data = await user.save();
      if (data) {
        res.status(200).json({ message: "user registered successfully" });
      }
    } else {
      res.status(401).json({ error: "user already registered" });
    }
  } catch (error) {
    res.status(401).json({ error: "error" });
  }
});
// route to login user
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
        let token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.cookie("jwt", token, { expire: 24 * 60 * 60, httpOnly: true });
        res.status(200).json({ message: "valid user" });
      } else {
        res.status(401).json({ error: "invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "invalid credentials" });
    }
  } catch (error) {
    res.status(404).json({ error: "something wrong" });
  }
});
// create route to authenticate the user is loggedIn or not
router.get("/auth", authenticate, (req, res) => {});
// route to logout the user
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "user logout" });
});
module.exports = router;

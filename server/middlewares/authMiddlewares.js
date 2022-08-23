let jwt = require("jsonwebtoken");
let User = require("../model/User");
let authenticate = async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      let verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
      let user = await User.findOne({ _id: verifyToken._id });
      if (user) {
        res.status(200).json({ user, loggedIn: true });
        next();
      } else {
        res.status(401).json({ error: "token is no set" });
        next();
      }
    } catch (error) {
      res.status(401).json({ error: "token is no set" });
      next();
    }
  } else {
    res.status(401).json({ error: "token is no set" });
    next();
  }
};
module.exports = { authenticate };

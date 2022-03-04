require("dotenv").config();
const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access Token Required");
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).send("Invalid Access Token");
    req.user = decoded;
    next();
  });
}

function checkInput(req, res, next) {
  const { name, email, password } = req.body;
  const passwordReg = "[a-zA-Z0-9]$";
  const nameReg = "[a-zA-Z]$";
  if (!password || !email)
    return res.status(400).send("One or more fields missing");
  if (name)
    if (!name.match(nameReg)) return res.status(400).send("Invalid name");
  if (!password.match(passwordReg))
    return res.status(400).send("Invalid password");
  next();
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}
module.exports = { validateToken, generateAccessToken, checkInput };

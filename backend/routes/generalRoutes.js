const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Home Page");
  res.send("<h1>Welcome!</h1>");
});

module.exports = router;

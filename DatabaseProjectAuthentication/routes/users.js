var express = require("express");
var router = express.Router();
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);
const { canSeeUserDetails } = require("./authMiddlewares");

router.get("/:userId", canSeeUserDetails, async function (req, res, next) {
  const user = await userService.getOne(req.params.userId);
  const username = req.user?.username ?? 0;
  res.render("userDetails", { user: user, username });
});

module.exports = router;

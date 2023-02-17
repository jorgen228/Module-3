var express = require("express");
var router = express.Router();
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);
const {
  canSeeUserDetails,
  canSeeUserList,
  checkIfAuthorized,
  isAdmin,
} = require("./authMiddlewares");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", canSeeUserList, async function (req, res, next) {
  const users = await userService.getAll();
  res.render("users", { users: users });
});

router.get("/:userId", canSeeUserDetails, async function (req, res, next) {
  const user = await userService.getOne(req.params.userId);
  const username = req.user?.username ?? 0;
  res.render("userDetails", { user: user, username });
});

router.delete(
  "/",
  checkIfAuthorized,
  isAdmin,
  jsonParser,
  async function (req, res, next) {
    let id = req.body.id;
    await userService.deleteUser(id);
    res.end();
  }
);

module.exports = router;

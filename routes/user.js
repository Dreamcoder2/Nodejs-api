const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/users", userController.getUser);

router.get("/userCount", userController.getCount);

router.post("/user", userController.postUser);

router.post("/login", userController.loginController);

module.exports = router;

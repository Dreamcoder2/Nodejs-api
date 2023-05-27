const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

router.get("/", orderController.getOrders);

router.post("/post", orderController.postOrder);

router.put("/status/:id", orderController.changeStatus);

module.exports = router;

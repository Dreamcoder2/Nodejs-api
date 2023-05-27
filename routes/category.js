const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category-controller");

router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getOneCategory);

router.put("/update/:id", categoryController.updateCategory);

router.post("/add", categoryController.addCategory);

router.delete("/remove/:id", categoryController.removeCategory);

module.exports = router;

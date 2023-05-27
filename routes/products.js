const express = require("express");
const router = express.Router();

const productController = require("../controllers/product-controller");
const product = require("../models/product");

router.get("/products", productController.getproduct);

router.get("/count", productController.getCount);

router.get("/singleProduct/:id", productController.getSingleProduct);

router.get("/featured", productController.getFeaturedProduct);

router.get("/featured/:count", productController.getFeaturedProductCount);

router.get("/getByCategory/:category", productController.getBycategory);

router.put("/updateProduct/:id", productController.updateProduct);

router.post("/addProducts", productController.addproduct);

router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;

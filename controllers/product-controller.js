const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(" ", "-");
    const extension = FILE_TYPE_MAP(file.mimetype);
    cb(null, `${filename + "-" + Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

exports.getproduct = (req, res) => {
  const product = Product.find()
    .then((result) => {
      res.status(201).json({ product: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//get a sinle product
exports.getSingleProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById({ _id: id })
    .populate("category")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

(exports.addproduct = uploadOptions.single("image")),
  (req, res, next) => {
    const fileName = req.file.fileName;
    const basepath = `${req.protocol}://${req.get("host")}/public/upload`;
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basepath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });
    product
      .save()
      .then((result) => {
        if (!result) {
          res.status(200).json({ message: "not able to save the product" });
        }
        res.status(200).json({ message: result });
      })
      .catch((err) => {
        res.status(500).json({
          errorMessage: err,
          success: false,
        });
      });
  };

//update product
exports.updateProduct = (req, res, next) => {
  // validate the caategory
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("invaalid product id");
  }
  const category = Category.findById(req.body.category);
  if (!category) return res.status(500).send("No category found");

  const id = req.params.id;

  Product.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image, // "http://localhost:3000/public/upload/image-2323232"
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("product not found");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

// delete product

exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndDelete({ _id: id })
    .then((result) => {
      if (!result) return res.status(500).send("not able to find product");
      res.status(200).send("product deleted success");
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

// how many products in the database
exports.getCount = async (req, res, next) => {
  const productCount = await Product.countDocuments();
  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: productCount,
  });
};

// fetch the fetured products
exports.getFeaturedProduct = (re, res, next) => {
  Product.find({ isFeatured: true })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get quantity based featured products
exports.getFeaturedProductCount = (req, res, next) => {
  const count = req.params.count ? req.params.count : 0;

  Product.find({ isFeatured: true })
    .limit(+count)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//geting by category

exports.getBycategory = (req, res, next) => {
  let filter = {};
  if (req.query.category) {
    filter = { category: req.query.category.split(",") };
  }
  Product.find(filter)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

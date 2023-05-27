const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  Quantity: {
    type: Number,
    require: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);

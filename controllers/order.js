// data base
const Order = require("../models/order");
const OrderItem = require("../models/order-Item");

exports.getOrders = (req, res, next) => {
  Order.find().then((orders) => {
    if (!orders) {
      res.status(500).json({ success: false });
    }
    res.send(orders);
  });
};

exports.postOrder = (req, res, next) => {
  const orderItemsIds = req.body.orderItems.map((orderItem) => {
    let newOrderItem = new OrderItem({
      Quantity: orderItem.quantity,
      product: orderItem.product,
    });

    newOrderItem.save().then((orderedIds) => {
      // const totalcost = orderedIds.map((product) => {
      //   OrderItem.find(product)
      //     .populate("product", "price")
      //     .then((price) => {
      //       return (cost = price.orderItem.price);
      //     });

      const combainorderIds = orderedIds._id;
      let order = new Order({
        orderItems: combainorderIds,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: cost,
        user: req.body.user,
      });
      order.save().then((result) => {
        if (!result) {
          return res.status(400).send("the order can't be created ");
        } else {
          res.status(200).send(result);
        }
      });
    });
    // .catch((err) => {
    //   res.status(404).send(err);
    // });
  });
};

exports.changeStatus = (req, res, next) => {
  const id = req.params.id;
  Order.findByIdAndUpdate(id, { status: " Shipped" }, { new: true })

    .then((result) => {
      if (!result) {
        res.status(404).send("status not updated");
      }
      res
        .status(200)
        .json({ message: "status updated success", result: result });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

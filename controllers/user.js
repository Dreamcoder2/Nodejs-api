const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// save the new user

exports.postUser = (req, res, next) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user
    .save()
    .then((user) => {
      if (!user) return res.status(400).send("the user cannot be created!");
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

// get user
exports.getUser = (req, res, next) => {
  User.find()
    .select("-passwordHash")
    .then((user) => {
      if (!user) {
        return res.status(404).send("user not found");
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// get Count

exports.getCount = async (req, res, next) => {
  const userCount = await User.countDocuments();
  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    userCount: userCount,
  });
};

//login
exports.loginController = (req, res, next) => {
  const secret = process.env.secret;
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(400).send("user not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: "1d" }
      );
      res.status(200).send({ user: user.email, token: token });
    } else {
      res.status(200).send("password is inccorrect");
    }
  });
};

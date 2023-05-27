exports.addCategory = (req, res, next) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category
    .save()
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res.status(404).json({ errorMessage: err });
    });
};

exports.removeCategory = (req, res, next) => {
  const id = req.params.id;
  Category.findByIdAndRemove(id)
    .then((result) => {
      res.status(201).json({ message: "removed success", message: result });
    })
    .catch((err) => {
      res.status(404).json({ message: "delete failed", errorMessage: err });
    });
};

exports.getCategories = (req, res, next) => {
  Category.find()
    .then((result) => {
      if (!result) {
        res.status(500).json({ success: false });
      }
      res.status(500).json({ message: result });
    })
    .catch((err) => {
      res.status(404).json({ ErrorMessage: err });
    });
};

exports.getOneCategory = (req, res, next) => {
  const id = req.params.id;
  Category.findOne({ _id: id })
    .then((result) => {
      if (!result) {
        res.status(500).json({ success: false });
      }
      res.status(500).json({ message: result });
    })
    .catch((err) => {
      res.status(404).json({ ErrorMessage: err });
    });
};

//update Categories

exports.updateCategory = (req, res, next) => {
  const id = req.params.id;
  Category.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        res.status(500).json({ success: false });
      }
      res.status(200).json({ message: result });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

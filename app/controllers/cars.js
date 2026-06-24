let CarModel = require('../models/cars');

module.exports.getCar = async function (req, res, next) {
  try {

    let car = await CarModel.findOne({ _id: req.params.id });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found."
      });
    }

    res.status(200);
    res.json({
      success: true,
      message: "Car retrieved successfully.",
      data: car
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {

    let car = req.body;

    let result = await CarModel.create(car);
    console.log("Result: " + result);

    res.status(200);
    res.json({
      success: true,
      message: "Car created successfully.",
      data: result
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.getAll = async function (req, res, next) {
  try {

    let list = await CarModel.find({});

    res.status(200);
    res.json({
      success: true,
      message: "Car list retrieved successfully.",
      data: list
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {

    let result = await CarModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Car not found. Are you sure it exists?"
      });
    }

    res.status(200);
    res.json({
      success: true,
      message: "Car updated successfully.",
      data: result
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.remove = async function (req, res, next) {
  try {

    let result = await CarModel.deleteOne({ _id: req.params.id });
    console.log("Result: " + result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json({
        success: true,
        message: "Car deleted successfully."
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Car not deleted. Are you sure it exists?"
      });
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}
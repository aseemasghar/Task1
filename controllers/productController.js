import Product from "../models/productModel.js";
// import User from "../models/userModel.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      user: req.user._id,
    };
    const product = await Product.create(newProduct);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get my products
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update product
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    // console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unathorized",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      success: true,
      message: "Product updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unathorized",
      });
    }
    await product.remove();
    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

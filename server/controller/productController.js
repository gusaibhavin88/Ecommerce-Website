import ProductModel from "../model/productModel.js";

export const getAllProduct = async (req, resp, next) => {
  let products = await ProductModel.find();
  try {
    if (!products) {
      resp.status(400).json({
        success: false,
        message: "Products Not Found",
      });
    } else {
      resp.status(200).json({
        success: true,
        data: products,
        message: "Products fetched successfully",
      });
    }
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, resp) => {
  const { name } = req.body;

  let product = await ProductModel.findOne({ name: name });

  if (product) {
    resp
      .status(401)
      .json({ success: false, message: "Product name already exist" });
  } else {
    product = await ProductModel.create(req.body);
    resp.status(200).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  }
  try {
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, resp) => {
  const { id } = req.params;

  try {
    let product = await ProductModel.findById(id);

    if (!product) {
      return resp
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated data against the model's schema
    });

    resp.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, resp, next) => {
  const { id } = req.params;

  try {
    let product = await ProductModel.findById(id);

    if (!product) {
      return resp
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    resp.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, resp) => {
  const { id } = req.params;

  try {
    let product = await ProductModel.findById(id);

    if (!product) {
      return resp
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product = await ProductModel.deleteOne({ _id: id });

    resp.status(200).json({
      success: true,
      data: product,
      message: "Product deleted successfully",
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

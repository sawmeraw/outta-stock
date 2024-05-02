const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const Product = require("./models/Product");
const Supplier = require("./models/Supplier");

//CORS
app.use(cors());

//Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

//Connect to MongoDB
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(err);
  });

//Create a new product
app.post("/api/newproduct", async (req, res) => {
  try {
    const {
      brand,
      productID,
      productName,
      supplier,
      sku,
      productColor,
      costPrice,
      retailPrice,
      salePrice,
      variants,
    } = req.body;
    const newProduct = new Product({
      brand,
      productID,
      productName,
      supplier,
      sku,
      productColor,
      costPrice,
      retailPrice,
      salePrice,
      variants,
    });
    await newProduct.save();

    res.status(200).json({ success: true, newProduct });
  } catch (err) {
    console.log("Error saving the product to the db.", err);
    res.status(500).json({ success: false, err: err.message });
  }
});

//Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({
      deleted: false,
    });
    res.status(200).json(products);
  } catch (err) {
    console.log("Error getting products from db.", err);
    res.status(500).json({ success: false, err: err.message });
  }
});

//Delete a product
app.delete("/api/deleteproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const filter = await Product.findOneAndUpdate(
      {
        productID: id,
      },
      { deleted: true, deletedAt: Date.now },
      { new: true }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error deleting the product ", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

//Get all deleted products
app.get("/api/products/deleted", async (req, res) => {
  try {
    const deletedProducts = await Product.find({ deleted: true });
    res.status(200).json(deletedProducts);
  } catch (error) {
    console.log("Error fetching deleted products from the db. ", err);
    res.status(500).json(err.message);
  }
});

//Restore a deleted product
app.patch("/api/products/deleted/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const filter = await Product.findOneAndUpdate(
      {
        productID: id,
      },
      {
        deleted: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("Error restoring the product", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

//Get all suppliers
app.get("/api/supplier/all", async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.status(200).json(suppliers);
  } catch (error) {
    console.log("Error fetching suppliers");
    res.status(500).json({ success: false, err: error.message });
  }
});

//Create a new supplier
app.post("/api/supplier/new", async (req, res) => {
  try {
    const { name, supplierCode } = req.body;
    const newSupplier = new Supplier({
      name,
      supplierCode,
    });
    await newSupplier.save();
    res.status(200).json({ success: true, newSupplier });
  } catch (error) {
    console.log("Error saving the supplier to the db.", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

//Permanently delete a product
app.delete("/api/removeproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findOneAndDelete({
      productID: id,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error deleting the product ", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

//Delete a supplier
app.delete("/api/supplier/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Supplier.findOneAndDelete({
      supplierCode: id,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error deleting the supplier", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

//Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

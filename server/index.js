const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const Product = require("./models/Product");
const Supplier = require("./models/Supplier");
const PurchaseOrder = require("./models/PurchaseOrder");
const Invoice = require("./models/Invoices");

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

app.post("/api/po/create", async (req, res) => {
  try {
    const {
      supplier,
      productID,
      chargeDate,
      dueDate,
      quantity,
      cost,
      initials,
      invoiceNumber,
      expectedDelivery,
    } = req.body;
    const newPO = new PurchaseOrder({
      supplier,
      productID,
      chargeDate,
      dueDate,
      quantity,
      cost,
      initials,
      invoiceNumber,
      expectedDelivery,
    });
    await newPO.save();

    const newInvoice = new Invoice({
      invoiceNumber,
      supplier,
      cost,
    });
    await newInvoice.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error saving the PO to the db.", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

app.get("/api/po/all", async (req, res) => {
  try {
    const pos = await PurchaseOrder.find({});
    res.status(200).json(pos);
  } catch (error) {
    console.log("Error fetching the POs.", error);
    res.status(500).json({ succcess: false, err: error.message });
  }
});

//Receive a PO
app.put("/api/po/receive/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const po = await PurchaseOrder.findOne({ invoiceNumber: id });
    const { quantity, productID } = po;
    const quantityNumber = parseInt(quantity);

    const updatedPO = {
      $set: {
        status: "Received",
      },
    };
    await PurchaseOrder.updateOne(
      {
        invoiceNumber: id,
      },
      updatedPO
    );

    const { stock } = await Product.findOne({
      productID: productID,
    });

    const newStock = parseInt(stock) + quantityNumber;

    const updatedProduct = await Product.updateOne(
      {
        productID: productID,
      },
      {
        $set: {
          stock: newStock.toString(),
        },
      },
      {
        new: true,
      }
    );

    console.log("Status updated for ", id);
    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    console.log("Error receiving the PO", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

//Cancel a PO
app.put("/api/po/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = {
      $set: {
        status: "Cancelled",
        cancelled: true,
      },
    };
    await PurchaseOrder.updateOne(
      {
        invoiceNumber: id,
      },
      update
    );
    console.log("PO cancelled for ", id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error cancelling the PO", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

app.get("/api/invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    res.status(200).json(invoices);
  } catch (error) {
    console.log("Error fetching invoices", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

app.put("/api/invoices/pay/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Invoice.updateOne(
      {
        invoiceNumber: id,
      },
      {
        $set: {
          paid: true,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error paying the invoice", error);
    res.status(500).json({ success: false, err: error.message });
  }
});

app.get("/api/editproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Product ID to edit", req.params);
    const update = await Product.findOne({
      productID: id,
    });
    // console.log("Product to edit", update);
    res.status(200).json(update);
  } catch (error) {
    console.log("Error fetching the product to edit", error);
    res.status(500).json({ success: false });
  }
});

app.put("/api/editproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    await Product.findOneAndUpdate(
      {
        productID: id,
      },
      update
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error updating the product", error);
    res.status(500).json({ success: false });
  }
});

//Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

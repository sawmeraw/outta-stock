const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PurchaseOrderSchema = new Schema(
  {
    supplier: {
      type: String,
      required: [true, "Supplier is required"],
    },
    productID: {
      type: String,
      required: [true, "Name is required"],
    },
    orderDate: {
      type: Date,
      required: [true, "Order Date is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due Date is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
    },
    invoiceNumber: {
      type: String,
      required: [true, "Invoice Number is required"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    expectedDelivery: {
      type: Date,
      required: [true, "Expected Delivery Date is required"],
    },
    status: {
      type: String,
      default: "Pending",
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "purchaseorders" }
);

const PurchaseOrder = mongoose.model("PurchaseOrder", PurchaseOrderSchema);

module.exports = PurchaseOrder;

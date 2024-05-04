const mongoose = require("mongoose");

let schema = mongoose.Schema;

let invoiceSchema = new schema(
  {
    invoiceNumber: {
      type: String,
    },
    supplier: {
      type: String,
    },
    cost: {
      type: Number,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "invoices" }
);

let Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;

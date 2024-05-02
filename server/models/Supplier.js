const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SupplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    supplierCode: {
      type: String,
      required: [true, "Supplier ID is required"],
    },
  },
  { collection: "suppliers" }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);

module.exports = Supplier;

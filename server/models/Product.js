const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ProductSchema = new Schema({
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  sku: {
    type: Number,
    required: [true, "SKU is required"],
  },
  color: {
    type: String,
    required: [true, "Color is required"],
  },
  cost: {
    type: Number,
    required: [true, "Cost is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  sale: {
    type: Number,
  },
  variants: {
    type: [
      {
        size: String,
        sku: Number,
      },
    ],
    default: [],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

ProductSchema.pre("save", function (next) {
  if (this.sale === undefined) {
    this.sale = this.price;
  }
  next();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

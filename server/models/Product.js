const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    productID: {
      type: String,
      required: [true, "Product ID is required"],
    },
    productName: {
      type: String,
      required: [true, "Name is required"],
    },
    supplier: {
      type: String,
      required: [true, "Supplier is required"],
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
    },
    productColor: {
      type: String,
      required: [true, "Color is required"],
    },
    costPrice: {
      type: String,
      required: [true, "Cost is required"],
    },
    retailPrice: {
      type: String,
      required: [true, "Price is required"],
    },
    salePrice: {
      type: String,
    },
    variantDetails: {
      type: [
        {
          size: String,
          sku: String,
        },
      ],
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    deletedOn: {
      type: Date,
      default: null,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { collection: "products" }
);

ProductSchema.pre("save", function (next) {
  if (this.sale === undefined) {
    this.sale = this.price;
  }
  next();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

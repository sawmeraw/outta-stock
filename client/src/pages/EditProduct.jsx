import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";

const EditProduct = () => {
  //dummy data
  const [product, setProduct] = useState({
    brand: "ExampleBrand",
    productName: "Example Product",
    productColor: "Red",
    sku: "SKU12345",
    costPrice: "100",
    retailPrice: "150",
    salePrice: "120",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product details:", product);
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/products"
        className="flex gap-2 font-semibold text-lg items-center mb-4"
      >
        <IoCaretBackOutline />
        <p className="hover:underline">Back to Products</p>
      </Link>
      <h1 className="text-xl font-semibold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-gray-700">Brand</span>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Brand"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Product Name</span>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Product Name"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Product Color</span>
          <input
            type="text"
            name="productColor"
            value={product.productColor}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Product Color"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">SKU</span>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="SKU"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Cost Price</span>
          <input
            type="text"
            name="costPrice"
            value={product.costPrice}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Cost Price"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Retail Price</span>
          <input
            type="text"
            name="retailPrice"
            value={product.retailPrice}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Retail Price"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Sale Price</span>
          <input
            type="text"
            name="salePrice"
            value={product.salePrice}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Sale Price (Optional)"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 w-1/6 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

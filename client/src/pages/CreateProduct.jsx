import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    brand: "",
    productName: "",
    productColor: "",
    sku: "",
    costPrice: "",
    retailPrice: "",
    salePrice: "",
    variants: false,
    variantDetails: [
      { sku: "", size: "" },
      { sku: "", size: "" },
      { sku: "", size: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVariantChange = (e) => {
    const { checked } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      variants: checked,
    }));
  };

  const handleVariantDetailsChange = (index, field, value) => {
    const updatedVariants = [...product.variantDetails];
    updatedVariants[index][field] = value;
    setProduct((prevState) => ({
      ...prevState,
      variantDetails: updatedVariants,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product details:", product);
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/management"
        className="flex gap-2 font-semibold text-lg items-center mb-4"
      >
        <IoCaretBackOutline />
        <p className="hover:underline">Back to Product Management</p>
      </Link>
      <h1 className="text-xl font-semibold mb-4">Create Product</h1>
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
        <label className="block">
          <span className="text-gray-700">Variants</span>
          <input
            type="checkbox"
            name="variants"
            checked={product.variants}
            onChange={handleVariantChange}
            className="ml-2"
          />
        </label>

        {product.variants && (
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">SKU</th>
                <th className="px-6 py-3 text-left">Size</th>
              </tr>
            </thead>
            <tbody>
              {product.variantDetails.map((variant, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) =>
                        handleVariantDetailsChange(index, "sku", e.target.value)
                      }
                      className="mt-1 block w-full p-2 border rounded"
                      placeholder="SKU"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) =>
                        handleVariantDetailsChange(
                          index,
                          "size",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full p-2 border rounded"
                      placeholder="Size"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

export default CreateProduct;

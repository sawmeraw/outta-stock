import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";

const Inventory = () => {
  const productID = "APL123";
  // const productID = useParams{};
  const inventoryData = [
    { sku: "SKU123", stock: 100, variants: ["Red", "Blue", "Green"] },
    { sku: "SKU124", stock: 80, variants: ["Small", "Medium", "Large"] },
  ];
  return (
    <>
      <div className="container mx-auto mt-8">
        <Link
          to="/products"
          className="flex gap-2 font-semibold text-lg items-center mb-4"
        >
          <IoCaretBackOutline />
          <p className="hover:underline">Back to Products</p>
        </Link>
        <h1 className="text-xl font-semibold mb-4">
          Inventory Details for Product ID: {productID}
        </h1>
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="px-6 py-3 text-left">SKU</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Variants</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-900">{item.sku}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.stock}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.variants.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inventory;

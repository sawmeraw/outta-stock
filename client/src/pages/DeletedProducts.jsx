import React from "react";
import { Link } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";

const deletedProducts = [
  { id: 1, name: "Widget A", productId: "WID001", deletedOn: "2023-04-10" },
  { id: 2, name: "Gadget B", productId: "GAD002", deletedOn: "2023-04-15" },
  { id: 3, name: "Tool C", productId: "TOOL003", deletedOn: "2023-04-20" },
];

const DeletedProductsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <Link
        to="/management"
        className="flex gap-2 font-semibold text-lg items-center mb-4"
      >
        <IoCaretBackOutline />
        <p className="hover:underline">Back to Product Mangement</p>
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Deleted Products</h1>
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="px-6 py-3 text-left">Product Name</th>
            <th className="px-6 py-3 text-left">Product ID</th>
            <th className="px-6 py-3 text-left">Deleted On</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deletedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-900">
                {product.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {product.productId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {product.deletedOn}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <button className="text-white bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2">
                  Restore
                </button>
                <button className="text-white bg-red-500 hover:bg-red-700 rounded-md px-4 py-2 ml-4">
                  Delete Permanently
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedProductsPage;

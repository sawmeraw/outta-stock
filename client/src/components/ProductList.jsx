import React from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Apple",
      productId: "APL123",
      stock: 100,
      sales: 23,
      cost: 1.5,
      rrp: 2.0,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-left">All Products</h2>
      <p className="text-right text-sm text-orange-800 mb-4">
        Showing 20 out of 100 products
      </p>
      <table className="table-auto w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Product ID</th>
            <th className="px-4 py-2 text-center">Stock</th>
            <th className="px-4 py-2 text-center">Sales</th>
            <th className="px-4 py-2 text-center">Cost</th>
            <th className="px-4 py-2 text-center">RRP</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2 ">
                <Link
                  to={`/editproduct/${product.productId}`}
                  className="hover:underline hover:text-blue-500"
                >
                  {product.name}
                </Link>
              </td>
              <td className="border px-4 py-2">{product.productId}</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2">{product.sales}</td>
              <td className="border px-4 py-2">${product.cost}</td>
              <td className="border px-4 py-2">${product.rrp}</td>
              <td className="border px-4 py-2 flex flex-col items-center">
                <Link
                  to={`/inventory/${product.productId}`}
                  className="text-white px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Inventory
                </Link>
                <button
                  onClick={() => onDelete(product.productId)}
                  className="text-white mt-2 bg-red-800 px-2 py-1 text-sm rounded-md hover:bg-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import fetchData from "./customInstance";
import { toast } from "react-toastify";

const ProductList = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const { isPending, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchData.get("/products"),
  });
  const products = data?.data;

  const { mutate: deleteProduct, isLoading } = useMutation({
    mutationFn: (id) => fetchData.delete(`/deleteproduct/${id}`),
    onSuccess: () => {
      toast.success("Product deleted successfully", {
        autoClose: 1500,
      });
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Error deleting product");
    },
  });

  const onDelete = (id) => {
    deleteProduct(id);
  };

  //Remaining: To Add loading and error state renders

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
          {products &&
            products.map((product) => (
              <tr key={product.productID}>
                <td className="border px-4 py-2 ">
                  <Link
                    to={`/editproduct/${product.productID}`}
                    className="hover:underline hover:text-blue-500"
                  >
                    {product.productName}
                  </Link>
                </td>
                <td className="border px-4 py-2">{product.productID}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">{product.sold}</td>
                <td className="border px-4 py-2">${product.costPrice}</td>
                <td className="border px-4 py-2">${product.retailPrice}</td>
                <td className="border px-4 py-2 flex flex-col items-center">
                  <Link
                    to={`/inventory/${product.productID}`}
                    className="text-white px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 rounded-md"
                  >
                    Inventory
                  </Link>
                  <button
                    onClick={() => onDelete(product.productID)}
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

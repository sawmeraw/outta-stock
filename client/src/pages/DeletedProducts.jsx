import React from "react";
import { Link } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "../components/customInstance";
import { toast } from "react-toastify";

const DeletedProductsPage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["deletedProducts"],
    queryFn: () => fetchData.get("/products/deleted"),
  });
  const queryClient = useQueryClient();
  const { mutate: restoreProduct, isLoading } = useMutation({
    mutationFn: (id) => fetchData.patch(`/products/deleted/restore/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["deletedProducts"]);
      toast.success("Product restored successfully", {
        autoClose: 1500,
      });
    },
    onError: () => {
      toast.error("Error restoring product", {
        autoClose: 1500,
      });
    },
  });

  const { mutate: deletePermanent, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => fetchData.delete(`/removeproduct/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["deletedProducts"]);
      toast.success("Product deleted permanently", {
        autoClose: 1500,
      });
    },
    onError: () => {
      toast.error("Error deleting product permanently", {
        autoClose: 1500,
      });
    },
  });

  const handleDeletePermanent = (id) => {
    deletePermanent(id);
  };

  const handleRestoreClick = (id) => {
    restoreProduct(id);
  };

  const deletedProducts = data?.data;

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
          {deletedProducts && deletedProducts.length === 0 && (
            <tr className="hover:bg-gray-100">
              <td
                colSpan="4"
                className="text-center py-4 uppercase text-red-500"
              >
                No deleted products
              </td>
            </tr>
          )}
          {deletedProducts &&
            deletedProducts.map((product) => (
              <tr key={product.productID} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.productName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.productID}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.deletedOn}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <button
                    className="text-white bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2"
                    onClick={() => handleRestoreClick(product.productID)}
                  >
                    Restore
                  </button>
                  <button
                    className="text-white bg-red-500 hover:bg-red-700 rounded-md px-4 py-2 ml-4"
                    onClick={() => handleDeletePermanent(product.productID)}
                  >
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

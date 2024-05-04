import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import fetchData from "../components/customInstance";
import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";

const Supplier = () => {
  const queryClient = useQueryClient();
  const {
    data: suppliers,
    isLoading: fetchingAllSuppliers,
    isError,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetchData.get("/supplier/all"),
  });

  const { mutate: deleteSupplier, isLoading: delLoading } = useMutation({
    mutationFn: (id) => fetchData.delete(`/supplier/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["suppliers"]);
      toast.success("Supplier deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting supplier");
    },
  });

  const handleDeleteSupplier = (id) => {
    deleteSupplier(id);
  };

  const handleSupplierAdd = (e) => {
    e.preventDefault();
    const { name, code } = e.target;
    const suppObj = {
      name: name.value,
      supplierCode: code.value,
    };
    const addSupplier = async () => {
      try {
        const response = await fetchData.post("/supplier/new", suppObj);
        if (response.data.success) {
          toast.success("Supplier added successfully");
        }
      } catch (error) {
        toast.error("Error adding supplier");
      }
    };
    addSupplier();
  };

  const supplierData = suppliers?.data;

  return (
    <>
      <div className="container mx-auto p-4">
        <Link
          to="/management"
          className="flex gap-2 font-semibold text-lg items-center mb-4"
        >
          <IoCaretBackOutline />
          <p className="hover:underline">Back to Product Mangement</p>
        </Link>
        <h1 className="text-2xl font-semibold mb-8">Manage Suppliers</h1>
        <div>
          <form onSubmit={handleSupplierAdd} className="p-4 mb-8">
            <h1 className="mb-4 font-semibold text-lg">Add a Supplier</h1>
            <div className="flex flex-col px-2">
              <label htmlFor="name" className="font-semibold text-md">
                Supplier Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="border-2 px-2 border-cyan-500 w-1/4 rounded-md"
              />
            </div>
            <div className="flex flex-col mb-4 px-2">
              <label htmlFor="code" className="font-semibold text-md">
                Supplier Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                required
                className="border-2 px-2 border-cyan-500 w-1/4 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 ml-2 text-white font-semibold rounded-md px-4 py-1"
            >
              Add
            </button>
          </form>
        </div>
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="px-6 py-3 text-left">Supplier Name</th>
              <th className="px-6 py-3 text-left">Supplier Code</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplierData &&
              supplierData.map((supplier) => {
                return (
                  <tr key={supplier.supplierCode}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {supplier.name.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {supplier.supplierCode.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          handleDeleteSupplier(supplier.supplierCode)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Supplier;

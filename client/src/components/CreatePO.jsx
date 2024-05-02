import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import fetchData from "./customInstance";

const CreatePurchaseOrder = () => {
  const {
    data: suppliers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetchData.get("/supplier/all"),
  });

  const supplierData = suppliers?.data;

  const {
    isPending,
    data: products,
    isError: productFetchError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchData.get("/products"),
  });
  const productData = products?.data;

  // State to hold form data
  const [formData, setFormData] = useState({
    supplier: "",
    invoiceNumber: "",
    productName: "",
    quantity: "",
    cost: "",
    chargeDate: "",
    dueDate: "",
    initials: "",
    expectedDelivery: "",
  });

  // Handle change in input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you would typically handle the backend API submission
    alert("Purchase Order Created Successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Create Purchase Order</h2>
      <p className="flex gap-2 items-center mb-4 bg-yellow-400 w-fit px-2 py-1 rounded-md">
        <IoInformationCircleOutline size={20} />
        <span>
          You can only create PO for products already in the database.
        </span>
      </p>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block">
            <span className="text-gray-700">Invoice Number</span>
            <input
              type="string"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Supplier</span>
            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            >
              <option value="">Select Supplier</option>
              {supplierData &&
                supplierData.map((supplier) => {
                  return (
                    <option
                      key={supplier.supplierCode}
                      value={supplier.supplierCode}
                    >
                      {supplier.name.toUpperCase()}
                    </option>
                  );
                })}
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Product Name</span>
            <select
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            >
              <option value="">Select Product</option>
              {productData &&
                productData.map((product) => {
                  return (
                    <option key={product.productID} value={product.productID}>
                      {" "}
                      {product.productID} - {product.productName}
                    </option>
                  );
                })}
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Quantity</span>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Cost (excl GST)</span>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-gray-700">Charge Date</span>
            <input
              type="date"
              name="chargeDate"
              value={formData.chargeDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Due Date</span>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Initials</span>
            <input
              type="text"
              name="initials"
              value={formData.initials}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Expected Delivery Date</span>
            <input
              type="date"
              name="expectedDelivery"
              value={formData.expectedDelivery}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreatePurchaseOrder;

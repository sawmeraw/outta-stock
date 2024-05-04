import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import fetchData from "../components/customInstance";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const EditProduct = () => {
  let id = useParams().id;
  // console.log("Product id logged", id);
  const { data, isLoading, isError } = useQuery({
    queryKey: [`product`, id],
    queryFn: () => fetchData.get(`/editproduct/${id}`),
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: submitForm, isError: postError } = useMutation({
    mutationFn: (data) => fetchData.put(`/editproduct/${id}`, data),
    onSuccess: () => {
      toast.success("Product updated successfully", { autoClose: 1500 });
      queryClient.invalidateQueries("product");
      navigate("/products");
    },
    onError: () => {
      toast.error("Product update failed", { autoClose: 1500 });
    },
  });

  const [formData, setFormData] = useState({
    brand: "",
    productName: "",
    productColor: "",
    sku: "",
    costPrice: "",
    retailPrice: "",
    salePrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
  };

  const product = data?.data;

  useEffect(() => {
    if (product) {
      setFormData({
        brand: product.brand,
        productName: product.productName,
        productColor: product.productColor,
        sku: product.sku,
        costPrice: product.costPrice,
        retailPrice: product.retailPrice,
        salePrice: product.salePrice,
      });
    }
  }, [product]);

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
      {product && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">Brand</span>
            <input
              type="text"
              name="brand"
              value={formData.brand}
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
              value={formData.productName}
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
              value={formData.productColor}
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
              value={formData.sku}
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
              value={formData.costPrice}
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
              value={formData.retailPrice}
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
              value={formData.salePrice}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="Sale Price (Optional)"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 w-1/6 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;

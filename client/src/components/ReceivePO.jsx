import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import fetchData from "./customInstance";
import { toast } from "react-toastify";

const ReceivePO = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingorders"],
    queryFn: () => fetchData.get("po/all"),
  });
  const queryClient = useQueryClient();
  const { mutate: receivePO } = useMutation({
    mutationFn: (invoiceNumber) => fetchData.put(`po/receive/${invoiceNumber}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingorders"]);
      toast.success("Purchase Order Received Successfully");
    },
    onError: () => {
      toast.error("Failed to receive Purchase Order");
    },
  });

  const { mutate: cancelPO } = useMutation({
    mutationFn: (invoiceNumber) => fetchData.put(`po/cancel/${invoiceNumber}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingorders"]);
      toast.success("Purchase Order Cancelled Successfully");
    },
    onError: () => {
      toast.error("Failed to cancel Purchase Order");
    },
  });

  const handleReceive = (invoiceNumber) => {
    receivePO(invoiceNumber);
  };

  const handleCancel = (invoiceNumber) => {
    cancelPO(invoiceNumber);
  };

  const purchaseOrders = orders?.data || [];
  const pendingOrders = purchaseOrders?.filter((order) => {
    return order.status === "Pending";
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Receive Purchase Orders</h2>
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="px-6 py-3 text-left">Invoice Number</th>
            <th className="px-6 py-3 text-left">Supplier</th>
            <th className="px-6 py-3 text-left">Order Date</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 uppercase text-red-500"
              >
                No pending orders
              </td>
            </tr>
          )}
          {pendingOrders.map((order) => (
            <tr key={order.invoiceNumber} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.invoiceNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.supplier.toUpperCase()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.chargeDate.substring(0, 10)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.status}
              </td>
              <td className="px-6 py-4 flex gap-2 text-sm text-gray-900">
                <button
                  onClick={() => handleReceive(order.invoiceNumber)}
                  className="text-white bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 mr-2"
                >
                  Receive
                </button>
                <button
                  onClick={() => handleCancel(order.invoiceNumber)}
                  className="text-white bg-red-500 hover:bg-red-700 rounded-md px-4 py-2"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivePO;

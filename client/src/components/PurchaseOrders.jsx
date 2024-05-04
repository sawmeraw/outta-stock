import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchData from "./customInstance";

const PurchaseOrders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["purchaseorders"],
    queryFn: () => fetchData.get("po/all"),
  });
  const purchaseOrdersData = orders?.data;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Purchase Orders</h2>
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="px-6 py-3 text-left">Invoice Number</th>
            <th className="px-6 py-3 text-left">Supplier</th>
            <th className="px-6 py-3 text-left">Order Date</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrdersData &&
            purchaseOrdersData.map((order, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.invoiceNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.supplier}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.chargeDate.substring(0, 10)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.status}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrders;

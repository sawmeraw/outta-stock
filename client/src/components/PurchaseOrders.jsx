import React from "react";

//dummy data
const purchaseOrdersData = [
  {
    orderId: "PO001",
    supplier: "Supplier A",
    date: "2023-04-10",
    status: "Received",
  },
  {
    orderId: "PO002",
    supplier: "Supplier B",
    date: "2023-04-15",
    status: "Pending",
  },
  {
    orderId: "PO003",
    supplier: "Supplier C",
    date: "2023-04-20",
    status: "Pending",
  },
];

const PurchaseOrders = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Purchase Orders</h2>
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Supplier</th>
            <th className="px-6 py-3 text-left">Order Date</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrdersData.map((order, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.orderId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.supplier}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{order.date}</td>
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

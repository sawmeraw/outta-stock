import React from "react";

// Dummy data for purchase orders
const purchaseOrders = [
  {
    id: 1,
    orderId: "PO1001",
    supplier: "Supplier A",
    orderDate: "2023-09-25",
    status: "Pending",
  },
  {
    id: 2,
    orderId: "PO1002",
    supplier: "Supplier B",
    orderDate: "2023-09-26",
    status: "Pending",
  },
  {
    id: 3,
    orderId: "PO1003",
    supplier: "Supplier C",
    orderDate: "2023-09-27",
    status: "Pending",
  },
];

const ReceivePO = () => {
  // Handler for receiving PO
  const handleReceive = (orderId) => {
    console.log(`Receive PO: ${orderId}`);
    // Here you would typically update the status in your backend
  };

  // Handler for cancelling PO
  const handleCancel = (orderId) => {
    console.log(`Cancel PO: ${orderId}`);
    // Here you would typically update the status in your backend
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Receive Purchase Orders</h2>
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Supplier</th>
            <th className="px-6 py-3 text-left">Order Date</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.orderId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.supplier}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.orderDate}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {order.status}
              </td>
              <td className="px-6 py-4 flex gap-2 text-sm text-gray-900">
                <button
                  onClick={() => handleReceive(order.orderId)}
                  className="text-white bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 mr-2"
                >
                  Receive
                </button>
                <button
                  onClick={() => handleCancel(order.orderId)}
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

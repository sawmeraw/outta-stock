import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "./customInstance";
import { toast } from "react-toastify";

const Invoices = () => {
  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => fetchData.get("/invoices"),
    queryKey: ["invoices"],
  });

  const queryClient = useQueryClient();

  const { mutate: payInvoice } = useMutation({
    mutationFn: (invoiceNumber) =>
      fetchData.put(`/invoices/pay/${invoiceNumber}`),
    onSuccess: () => {
      toast.success("Invoice Paid Successfully");
      queryClient.invalidateQueries(["invoices"]);
    },
    onError: () => {
      toast.error("Failed to pay invoice");
    },
  });

  const handlePay = (invoiceNumber) => {
    payInvoice(invoiceNumber);
  };

  const invoiceData = invoices?.data;
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-8">Invoices</h1>
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="px-6 py-3 text-left">Invoice Number</th>
              <th className="px-6 py-3 text-left">Supplier</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData &&
              invoiceData.map((invoice) => (
                <tr key={invoice.invoiceNumber} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {invoice.supplier.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${invoice.cost}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {invoice.paid ? (
                      "Paid"
                    ) : (
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2"
                        onClick={() => handlePay(invoice.invoiceNumber)}
                      >
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Invoices;

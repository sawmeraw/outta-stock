import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">About This Site</h1>
      <p className="mb-4 text-gray-600 leading-relaxed">
        Welcome to our website! This platform is designed to streamline your
        inventory and purchase order management processes efficiently. Below
        you'll find a guide on how to use the various features of our site.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Creating Purchase Orders
        </h2>
        <p className="text-gray-600 leading-relaxed">
          To create a new purchase order, navigate to the 'PO' section and click
          on 'Create'. Fill in the required fields, such as supplier, product,
          quantity, and expected delivery date, and submit the form to place a
          new order.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Managing Purchase Orders
        </h2>
        <p className="text-gray-600 leading-relaxed">
          You can view all purchase orders under the 'Purchase Orders' tab. This
          page allows you to monitor the status of each order, and perform
          actions such as receive or cancel, directly from the list.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Receiving Purchase Orders
        </h2>
        <p className="text-gray-600 leading-relaxed">
          When goods arrive, go to the 'Receive' tab under the 'PO' section. You
          can then update the status of the orders as received or cancel them if
          necessary.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Product Analytics
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Access detailed analytics on your products by navigating to the
          'Product Analytics' page. This feature provides insights into sales
          performance, stock levels, and more to help you make informed
          decisions.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Additional Information
        </h2>
        <p className="text-gray-600 leading-relaxed">
          For any further assistance or queries, please do not hesitate to
          contact our support team. We're here to help you make the most out of
          your experience with our platform.
        </p>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import { Link } from "react-router-dom";
import { MdCreate, MdAnalytics, MdDelete } from "react-icons/md";
import { TiExportOutline } from "react-icons/ti";

const managementLinks = [
  {
    title: "Create a Product",
    icon: <MdCreate size={30} />,
    path: "/create-product",
  },
  {
    title: "Product Analytics",
    icon: <MdAnalytics size={30} />,
    path: "/analytics",
  },
  {
    title: "Export All Products",
    icon: <TiExportOutline size={30} />,
    path: "/export-products",
  },
  {
    title: "View Deleted Products",
    icon: <MdDelete size={30} />,
    path: "/deleted-products",
  },
  {
    title: "Manage Suppliers",
    icon: <MdCreate size={30} />,
    path: "/manage-suppliers",
  },
];

const ManagementPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-8">Management Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {managementLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-gray-100"
          >
            {link.icon}
            <span className="mt-2 text-lg">{link.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManagementPage;

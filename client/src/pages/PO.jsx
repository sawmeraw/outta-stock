import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";

const PO = () => {
  const [outlet, setOutlet] = useState("");

  const links = [
    {
      name: "Purchase Orders",
      path: "",
    },
    {
      name: "Create",
      path: "create",
    },
    {
      name: "Receive",
      path: "receive",
    },
    {
      name: "Invoices",
      path: "invoices",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-8">PO Manager</h1>
        <div className="flex mb-6 gap-6">
          {links.map((link) => {
            return (
              <Link
                key={link.path}
                to={link.path}
                className={` ${
                  link.path === outlet ? "bg-blue-500 text-white" : ""
                } rounded-md hover:bg-slate-500  px-2 py-1`}
                onClick={() => setOutlet(link.path)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default PO;

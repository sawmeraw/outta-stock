import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [page, setPage] = useState("products");
  const links = ["products", "management", "PO", "about"];
  return (
    <>
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto grid grid-cols-3">
          <div className="font-bold text-xl flex items-center">
            <Link to="/products" onClick={() => setPage("products")}>
              Outta Stock
            </Link>
          </div>
          <div className="flex justify-between gap-8">
            {links.map((link) => {
              return (
                <Link
                  key={link}
                  to={`/${link}`}
                  className={` ${
                    page == link ? "bg-slate-500 font-semibold" : ""
                  } hover:text-gray-300 capitalize px-2 rounded-md py-2`}
                  onClick={() => setPage(link)}
                >
                  {link}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

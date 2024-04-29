import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Outta Stock. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Follow us on{" "}
          <a href="#" className="text-blue-400 hover:text-blue-600">
            Twitter
          </a>
          ,{" "}
          <a href="#" className="text-blue-400 hover:text-blue-600">
            Facebook
          </a>
          , and{" "}
          <a href="#" className="text-blue-400 hover:text-blue-600">
            Instagram
          </a>
          .
        </p>
        <p className="text-sm font-bold mt-2">
          Developed by{" "}
          <span className="bold text-lg">&lt;Sameer Panday/&gt;</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import Search from "../components/Search";
import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <>
      <div className="container mx-auto">
        <Search />
        <ProductList />
      </div>
    </>
  );
};

export default Products;

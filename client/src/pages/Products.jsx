import React from "react";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import SearchProvider, { useSearch } from "../components/SearchContext";

const Products = () => {
  return (
    <>
      <div className="container mx-auto">
        <SearchProvider>
          <Search />
          <ProductList />
        </SearchProvider>
      </div>
    </>
  );
};

export default Products;

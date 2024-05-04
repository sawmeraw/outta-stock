import React, { useCallback } from "react";
import { useSearch } from "./SearchContext";

const Search = () => {
  const { handleSearchChange, searchTerm } = useSearch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const term = formData.get("search");
    handleSearchChange(e.target[0]);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleFormSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;

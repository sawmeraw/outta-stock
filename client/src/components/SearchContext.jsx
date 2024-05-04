import fetchData from "./customInstance";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () => fetchData.get(`/products`),
  });

  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isLoading: mutateLoading } = useMutation({
    mutationFn: (id) => fetchData.delete(`/deleteproduct/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allproducts"]);
      toast.success("Product deleted successfully", {
        autoClose: 1500,
      });
    },
    onError: () => {
      toast.error("Error deleting product");
    },
  });

  const handleSearchChange = (element) => {
    setSearchTerm(element.value);
  };

  useEffect(() => {
    if (searchTerm == "") {
      setResults(data?.data || []);
    } else {
      const filteredResults = data?.data.filter((product) => {
        return (
          product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.productID.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setResults(filteredResults);
    }
  }, [searchTerm, data]);

  const ctx = {
    searchTerm,
    handleSearchChange,
    results,
    isLoading,
    deleteProduct,
  };

  return (
    <SearchContext.Provider value={ctx}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;

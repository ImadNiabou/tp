"use client";
import Card from "../Components/Card";
import { getAllProducts } from "../../sanity/product-utils";
import React, { useState, useEffect } from "react";

function Products() {
  const [data, setData] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const products = await getAllProducts();
      setData(products);
    };
    fetchData();
  }, []);

  const applyFilters = () => {
    const filteredProducts = data.filter((product) => {
      const price = parseFloat(product.price); // assuming price is a string
      const isMinPriceValid = !minPrice || price >= parseFloat(minPrice);

      const matchesSearchQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // Add additional checks based on other relevant attributes
        // For example: product.description.toLowerCase().includes(searchQuery.toLowerCase())
        false;

      return isMinPriceValid && matchesSearchQuery;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "highest") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortBy === "lowest") {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });

    setData(sortedProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [minPrice, sortBy, searchQuery]);

  const resetFilters = () => {
    setMinPrice("");
    setSortBy("latest");
    setCurrentPage(1);
    setProductsPerPage(5);
    setSearchQuery("");
    fetchData();
  };

  const fetchData = async () => {
    const products = await getAllProducts();
    setData(products);
  };

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex flex-col items-center justify-center mt-[60px] space-y-4">
        <h1 className="text-4xl font-bold text-purple text-center">
          Get Artistic Prints!
        </h1>
        <p className="text-center text-xl text-gray-500 py-10">
          Elevate your space with stunning art prints, Transform your
          surroundings with captivating visuals.
        </p>
      </div>

      <div className="flex flex-col md:flex-row p-10">
        {/* Filters */}
        <div className="mr-8">
          <h1 className="text-2xl font-semibold text-purple mb-4">Filters</h1>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Search</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Price Range</h2>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Filter and Sort Dropdowns */}
            <div className="space-y-2">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-[#5B20B6]"
                >
                  <option value="latest">Sort by Latest</option>
                  <option value="oldest">Sort by Oldest</option>
                  <option value="highest">Sort by Most Expensive</option>
                  <option value="lowest">Sort by Lowest Price</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.292 11.707a1 1 0 0 1 1.414 0L12 14.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative mt-4">
            <select
              value={productsPerPage}
              onChange={(e) => setProductsPerPage(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-[#5B20B6]"
            >
              <option value="1">1 Product Per Page</option>
              <option value="3">3 Products Per Page</option>
              <option value="5">5 Products Per Page</option>
              <option value="10">10 Products Per Page</option>
              <option value="15">15 Products Per Page</option>
              <option value="20">20 Products Per Page</option>
              <option value="25">25 Products Per Page</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M8.292 11.707a1 1 0 0 1 1.414 0L12 14.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
              </svg>
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full transition ease-in-out delay-80  hover:-translate-y-1 hover:scale-95 duration-300 text-lg w-full  font-semibold text-center bg-purple
            text-white py-2 px-4 rounded-lg hover:text-purple hover:bg-white border border-purple my-3"
          >
            Reset
          </button>
        </div>

        <p className="text-sm text-gray-700">
          {data.length > productsPerPage && (
            <>
              page {currentPage} of {Math.ceil(data.length / productsPerPage)}
            </>
          )}
        </p>

        {/* Product Grid */}
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {currentProducts?.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        {data.length > productsPerPage && (
          <ul className="flex list-none justify-center space-x-2">
            {Array.from(
              { length: Math.ceil(data.length / productsPerPage) },
              (_, index) => (
                <li key={index} className="cursor-pointer">
                  <a
                    onClick={() => paginate(index + 1)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Products;

"use client";

import React, { FC, useState } from "react";
import ProductCard from "@/components/Product/ProductCard";
import { BsSearch } from "react-icons/bs";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { fetcher } from "@/lib/utils";

interface ProductsProps {}

interface Product {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

const Products: FC<ProductsProps> = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const {
    data: product,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/products?search=${searchInput}`, fetcher);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Search Input:", searchInput);

    mutate(`/api/products?search=${searchInput}`);
  };

  return (
    <div>
      <div className="container pt-5">
        <div className="w-full sm:w-[300px] md:w-[100%] relative">
          <form onSubmit={handleSubmit} className="relative">
            <input
              className="border-gray-200 border p-2 px-4 rounded-lg w-full"
              type="text"
              placeholder="Mencari nama produk"
              value={searchInput}
              onChange={handleInputChange}
            />
            <BsSearch
              className="absolute right-0 top-0 mr-3 mt-3 text-gray-400 cursor-pointer"
              size={20}
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
      <div className="container pt-10">
        <h2 className="font-medium text-2xl pb-4">Semua Produk</h2>
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-3 gap-x-1 xl:gap-y-10 mb-10">
          {error ? (
            <div>Error loading products</div>
          ) : !product || !product.data ? (
            <div>Loading...</div>
          ) : (
            product.data.map((item: Product) => (
              <ProductCard
                key={item.id}
                id={item.id}
                img={item.image}
                title={item.name}
                desc={item.description}
                rating={item.rating}
                price={item.price.toString()}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

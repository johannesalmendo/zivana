"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { Product } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";

interface ProductsPageProps {}

const ProductsPage: FC<ProductsPageProps> = ({}) => {
  const {
    data: productsData,
    isLoading,
    error,
  } = useSWR(`api/products`, fetcher);

  return (
    <div>
      <div className="container mx-auto py-10">
        {error ? (
          <div>Error loading products</div>
        ) : !productsData || !productsData.data ? (
          <div></div>
        ) : (
          <DataTable columns={columns} data={productsData.data} />
        )}

        
      </div>
    </div>
  );
};

export default ProductsPage;

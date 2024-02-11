/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Gambar",
    cell: ({ row }) => (
      <Image
        src={`${row.original.image}`}
        alt="Product Image"
        width={40}
        height={40}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
  },
  {
    accessorKey: "price",
    header: "Harga",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const productQueryParam = encodeURIComponent(
        JSON.stringify(row.original)
      );

      const handleDelete = async () => {
        const id = row.original.id;

        const formData = new FormData();
        formData.append("id", id);

        try {
          const response = await fetch(`/api/products`, {
            method: "DELETE",
            body: formData,
          });

         
          console.log(response);

          // Handle the response as needed
          if (response.ok) {
            // Successful deletion
            await router.refresh();

            console.log("Product deleted successfully");
          } else {
            // Handle other status codes (e.g., 404 Not Found, 500 Internal Server Error)
            console.error("Error deleting product:", response.statusText);
          }
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/product-detail/edit-product?product=${productQueryParam}`
                )
              }
            >
              Edit
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="text-red-500">
            
            </DropdownMenuItem> */}

            <AlertDialog>
              <AlertDialogTrigger className="text-red-500 ml-2">Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you want to delete this product?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your product and remove your data from servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500" onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


import { Link } from "lucide-react";
import React, { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import prisma from "../../../../../lib/prisma";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";
import { button } from "@material-tailwind/react";


type paramsType = {
  id: string;
};

interface ProductDetailProps {
  params: paramsType;
}

async function getDetailProduct(id: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });

  return product;
}

const ProductDetail: FC<ProductDetailProps> = async ({ params }) => {
  const product = await getDetailProduct(params.id);
  const generateRating = (rating: number) => {
    switch (rating) {
      case 1:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        );
      case 2:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        );
      case 3:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        );
      case 4:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
        );
      case 5:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600 shadow-md" >
        <div className="relative flex h-full flex-col text-gray-600 md:flex-row">
          <div className="relative p-8 md:w-4/6">
            <div className="flex flex-col md:flex-row">
              <h2 className="mb-2 text-2xl font-black">{product?.name}</h2>

            </div>
            <div className="mt-3 font-sans text-base tracking-normal">{product?.description}</div>
            {/* <div>{generateRating(product?.rating!)}</div> */}
            <div className="flex flex-col md:flex-row md:items-end">
              <div className="mt-6 text-4xl font-black">{formatRupiah(product?.price!)}</div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row">
              <a href="https://wa.me/6289686946758?text=Hi%2C%20I%20want%20to%20order%20" target="blank" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Beli Sekarang
              </a>

            </div>
          </div>
          <div className="mx-auto flex items-center px-5 pt-1 md:p-8">
            <Image className="block h-auto max-w-full rounded-md shadow-lg" src={`/${product?.image}`} width={250} alt="Shop image" />
          </div>
        </div>
      </div>
      <div className="pt-60"></div>
    </div>


  );
};

export default ProductDetail;

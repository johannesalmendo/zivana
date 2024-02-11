import { formatRupiah } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";



interface propsType {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  id: string;
}

const ProductCard: React.FC<propsType> = ({
  img,
  title,
  desc,
  rating,
  price,
  id,
}) => {

  const router = useRouter();
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
    // <div className="border border-gray-200 rounded-xl" style={{ height: '590px', display: 'flex', flexDirection: 'column' }}>
    //   <div>
    //     <Image
    //       className="border border-gray-200 rounded-xl w-full h-auto"
    //       src={`/${img}`}
    //       width={200}
    //       height={300}
    //       alt={title}
    //     />
    //   </div>

    //   <div className="px-2 space-y-2 py-2 flex-grow">
    //     <h2 className="text-rose-500 font-medium">{title}</h2>
    //     <p className="text-gray-500 text-sm">{desc}</p>
    //     <div>{generateRating(rating)}</div>

    //     <div className="font-bold flex gap-4">
    //       {formatRupiah(parseInt(price))}
    //     </div>
    //   </div>

    //   {session === null ? (
    //     <Link
    //       href="/auth/signin"
    //       className="bg-primary text-white text-[14px] md:text-[16px] p-2 px-4 m-2 rounded-lg inline-block cursor-pointer hover:bg-blackish"
    //     >
    //       Order Now
    //     </Link>
    //   ) : (
    //     <button
    //       onClick={() => {
    //         router.push(`/product-detail/${id}`)
    //       }}
    //       className="bg-primary text-white text-[14px] md:text-[16px] p-2 px-6 m-2 rounded-lg inline-block cursor-pointer hover:bg-blackish"
    //     >
    //       Order Now
    //     </button>
    //   )}
    // </div>

    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div
        className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <Image
          width={550}
          height={300}
          src={img}
          alt="card-image" />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {title}
        </h5>
        <div className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {desc}
        </div>
        <div>{generateRating(rating)}</div>
        {formatRupiah(parseInt(price))}
      </div>
      <div className="p-6 pt-0">
        {/* <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button">
          Read More
        </button> */}

        <a href="https://wa.me/6289686946758?text=Hi%2C%20I%20want%20to%20order%20" target="blank" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Pesan Sekarang</a>
      </div>
    </div>
  );

};

export default ProductCard;

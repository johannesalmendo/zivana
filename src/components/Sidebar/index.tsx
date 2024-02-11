"use client";

import { Button } from "@/components/ui/button";
import React, { FC } from "react";

import { HiOutlineClipboardList } from "react-icons/hi";
import { BsBuilding, BsGear } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineUsergroupAdd,
  AiOutlineCalendar,
  AiOutlineLogout,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import SignOutDialog from "../SignOutDialog";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="bg-gray-900 min-h-screen pb-12">
      <div className="px-3 py-2">
        <h2 className="px-6 mt-5 mb-2 py-2 text-lg font-semibold bg-white rounded text-gray-700">
          Admin Zevana
        </h2>
        <div className="space-y-3">
          <Button
            variant={"ghost"}
            className="justify-start w-full rounded-none  text-white rounded hover:text-black"
            onClick={() => router.push("/admin")}
          >
            <AiOutlineHome className="mr-2 text-lg" />
            Produk
          </Button>

          {/* <Button
            variant={"ghost"}
            className="justify-start w-full rounded-none hover:text-primary"
            onClick={() => router.push("/users")}
          >
            <AiOutlineUsergroupAdd className="mr-2 text-lg" />
            Users
          </Button> */}

          <SignOutDialog>
            <Button
              variant={"ghost"}
              className="justify-start w-full rounded text-red-500 hover:bg-red-200 hover:text-red-500"
              // onClick={() => signOut()}
            >
              <AiOutlineLogout className="mr-2 text-lg" />
              Logout
            </Button>
          </SignOutDialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

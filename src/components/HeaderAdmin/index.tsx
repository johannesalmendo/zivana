"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface HeaderAdminProps {}

const Header: FC<HeaderAdminProps> = ({}) => {
  const { data: session } = useSession();
  
  return (
    <div className="flex flex-row items-center justify-between pb-3 mb-8 border-b border-border">
      <div>
        <div className="font-semibold">Selamat Datang di Dashboard Admin Zevana Store</div>
      </div>
      <div></div>
    </div>
  );
};

export default Header;

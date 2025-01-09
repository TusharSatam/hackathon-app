"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();

  // Sign Out functionality
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <div className=" z-50 shadow-md p-4 hidden md:flex w-full bg-background h-[50px]">
      <div className="flex justify-between items-center xl:max-w-[1280px] mx-auto w-full">
        <div className="text-2xl font-semibold text-white cursor-pointer" onClick={()=>router.push("/home")}>Hackathon App</div>
        <div className="flex gap-6">
          <Link href="/home" className="text-lg text-white hover:text-primary">
            Home
          </Link>
         
          <button
            onClick={handleSignOut}
            className="flex items-center text-lg text-red-600 hover:text-red-700"
          >
            <FaSignOutAlt className="mr-2" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

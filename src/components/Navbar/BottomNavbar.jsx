"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const BottomNavbar = () => {
  const router = useRouter();

  // Sign Out functionality
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <div className="bottomNavbar flex md:hidden bg-white shadow-lg  w-full h-[6vh] z-50">
      <div className="flex justify-around items-center w-full">
        <Link href="/home" className="text-center text-gray-700 hover:text-primary py-2">
          Home
        </Link>
 
        <button onClick={handleSignOut} className="text-center text-red-600 hover:text-red-700 py-2">
          <FaSignOutAlt className="inline-block mr-2" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default BottomNavbar;

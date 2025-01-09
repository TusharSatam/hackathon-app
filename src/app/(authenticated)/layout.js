"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "@/components/Navbar/Navbar";
import BottomNavbar from "@/components/Navbar/BottomNavbar";
import { setError, setLoading, setUser } from "@/redux/slice/user";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if we have an authToken in localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // If token exists, fetch user data
      const fetchUserData = async () => {
        dispatch(setLoading(true)); // Set loading state to true

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const data = await res.json();

          if (res.ok && data.user) {
            // Dispatch user data if response is successful
            dispatch(setUser(data.user));
          } else {
            // Handle error, e.g., invalid token
            dispatch(setError("Failed to fetch user data."));
          }
        } catch (error) {
          dispatch(setError("Error while fetching user data."));
        } finally {
          dispatch(setLoading(false)); // Set loading state to false after request completes
        }
      };

      fetchUserData();
    }
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Desktop Navbar */}
      <Navbar />
      <nav className=" flex justify-center items-center md:hidden text-lg font-semibold text-white h-[6vh] px-2 text-center ">
        Hackathon App
      </nav>
      <div className="flex-1 w-full xl:max-w-[1280px] mx-auto overflow-y-auto h-[88vh] md:h-full  px-3 py-[10px]  md:my-4">
        <div className="flex items-center flex-col h-auto text-white mb-4 md:my-0">
          {children}
        </div>
      </div>
      {/* Bottom Navbar for Mobile */}
      <BottomNavbar />
    </div>
  );
};

export default Layout;

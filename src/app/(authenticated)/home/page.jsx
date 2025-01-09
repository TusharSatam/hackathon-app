"use client";

import PrimaryBtn from "@/components/Buttons/PrimaryBtn";
import SecondaryBtn from "@/components/Buttons/SecondaryBtn";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  // Function to check if token is present in localStorage
  const checkUserSession = () => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    return token ? true : false; // If token exists, user is authenticated
  };

  useEffect(() => {
    // Check for token (logged-in state) on component mount
    if (!checkUserSession()) {
      // Redirect to login page if the user is not authenticated
      router.push("/login");
    }
  }, [router]); // Make sure the effect runs again if `router` changes

  return (
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-primary">
            Welcome
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your Hackathon Journey Starts Here! Let's innovate and collaborate.
          </p>
          <div className="flex justify-center gap-4 md:flex-row flex-col">
            <PrimaryBtn
              onClick={() => router.push("/events")}
              btnText={"Explore Events"}
            />
            <SecondaryBtn
              onClick={() => router.push("/create-event")}
              btnText={"Create Event"}
            />
          </div>
        </div>
      </div>
  );
}

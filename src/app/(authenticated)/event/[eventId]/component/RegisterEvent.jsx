"use client";
import React, { useState, useEffect } from "react";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn";
import Skeleton from "react-loading-skeleton"; // Use this if you're using the react-loading-skeleton package
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import 'react-loading-skeleton/dist/skeleton.css'

const RegisterEvent = ({ eventId }) => {
  const { user } = useSelector((state) => state.user);
  const [isRegistered, setIsRegistered] = useState(null); // To store the registration status
  const [loading, setLoading] = useState(true); // To handle the loading state

  // Function to check if the user is registered
  const checkIfRegistered = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hackathons/isregister?hackathonId=${eventId}&userId=${user.userId}`);
      const data = await response.json();

      if (response.ok) {
        setIsRegistered(data.isRegistered); // Set the result in state
      } else {
        toast.error(data.message || "Error checking registration");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during checking registration.");
    } finally {
      setLoading(false); // Hide the loading state after the request
    }
  };

  useEffect(() => {
    if (user?.userId && eventId) {
      checkIfRegistered(); // Trigger the registration check when the component loads
    }
  }, [user?.userId, eventId]); // Runs when either the userId or eventId changes

  // Handle registration
  const onSubmit = async () => {
    try {
      const response = await fetch(`/api/hackathons/register?userId=${user.userId}&eventId=${eventId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Successfully Registered!");
        setIsRegistered(true)
      } else {
        toast.error(result.message || "Error while registering, please try again later");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <>
      {/* Button Skeleton / Check if registered logic */}
      {loading ? (
        <Skeleton width={150} height={40} /> // Skeleton loading indicator for the button
      ) : isRegistered === null ? (
        <PrimaryBtn btnText="Check Registration Status" onClick={() => checkIfRegistered()} />
      ) : isRegistered ? (
        <PrimaryBtn btnText="Already Registered" onClick={null} disabled={true} />
      ) : (
        <PrimaryBtn btnText="Register" onClick={onSubmit} />
      )}
    </>
  );
};

export default RegisterEvent;

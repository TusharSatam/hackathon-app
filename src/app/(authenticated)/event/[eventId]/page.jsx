import PrimaryBtn from "@/components/Buttons/PrimaryBtn";
import SecondaryBtn from "@/components/Buttons/SecondaryBtn";
import Image from "next/image";
import React from "react";
import RegisterEvent from "./component/RegisterEvent";

// Fetch event data on the server side
async function fetchEventDetails(eventId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hackathons/${eventId}`,
    {
      cache: "no-store", // Prevent caching for up-to-date data
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch event details");
  }

  return response.json();
}

const EventDetails = async ({ params }) => {
  const { eventId } = params;

  try {
    const eventDetails = await fetchEventDetails(eventId);

    return (
      <div className=" w-[95%] sm:w-[80%] lg:w-[50%] mx-auto mb-8 p-3 sm:p-6  shadow-lg rounded-lg text-white">
        {/* Banner */}
        {eventDetails.banner && (
          <div className="mb-6">
            <Image
              src={eventDetails.banner}
              alt={eventDetails.title}
              width={1280} // Specify image dimensions
              height={400} // Matches aspect ratio of original image
              className="rounded-lg shadow-md object-cover h-[200px]" // Adds styles
              placeholder="blur" // Optimized loading
              blurDataURL="/placeholder-image.jpg" // Placeholder for low-quality image preview
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-primary mb-6">
          {eventDetails.title}
        </h1>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <p className="text-lg font-medium text-white mb-2">
              <strong>Location:</strong> {eventDetails.location || "Online"}
            </p>
            <p className="text-lg font-medium text-white mb-2">
              <strong>Dates:</strong>{" "}
              {`${new Date(
                eventDetails.startDate
              ).toLocaleDateString()} - ${new Date(
                eventDetails.endDate
              ).toLocaleDateString()}`}
            </p>
            <p className="text-lg font-medium text-white mb-2">
              <strong>Maximum Participants:</strong>{" "}
              {eventDetails.maxParticipants || "No Limit"}
            </p>
            <p className="text-lg font-medium text-white mb-2">
              <strong>Total Prizes:</strong> ₹
              {eventDetails.prizes?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* Right Section */}
          <div>
            <p className="text-lg font-medium text-white mb-4">
              <strong>Organizer:</strong>{" "}
              {eventDetails.createdBy ? (
                <a
                  // href={`/profile/${eventDetails.createdBy}`}
                  className="text-blue-600 hover:underline"
                >
                  View Organizer Profile
                </a>
              ) : (
                "Not Available"
              )}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Event Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {eventDetails.description}
          </p>
        </div>

        {/* Footer: Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <RegisterEvent eventId={eventId} />
          <SecondaryBtn btnText={"Contact Organizer"} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-8 text-red-500">
        <h1 className="text-xl font-bold">Error Loading Event Details</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default EventDetails;

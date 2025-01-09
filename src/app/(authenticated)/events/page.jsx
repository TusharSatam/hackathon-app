"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Events = () => {
  const [upcomingHackathons, setUpcomingHackathons] = useState([]);
  const [pastHackathons, setPastHackathons] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const router = useRouter();
const {user}=useSelector((state)=>state.user);
  // Fetching hackathons data
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const upcomingRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hackathons/upcoming`);
        const pastRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hackathons/past`);
        
        const upcomingData = await upcomingRes.json();
        const pastData = await pastRes.json();

        if (upcomingRes.ok) setUpcomingHackathons(upcomingData);
        if (pastRes.ok) setPastHackathons(pastData);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      }
    };

    fetchHackathons();
  }, []);

  // Tab toggle
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // Card click to navigate to details
  const handleCardClick = (hackathonId) => {
    router.push(`/event/${hackathonId}`);
  };

  const currentHackathons =
    activeTab === "upcoming" ? upcomingHackathons : pastHackathons;

  return (
    <div className="w-full flex justify-center items-center flex-col">
      {/* Tab */}
      <div className="flex justify-start items-center border-b border-textSecondary">
        <button
          className={`px-4 py-2 ${
            activeTab === "upcoming"
              ? "border-b-2 border-primary text-primary font-semibold"
              : ""
          }`}
          onClick={() => handleTabSwitch("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`ml-4 px-4 py-2 ${
            activeTab === "past"
              ? "border-b-2 border-primary text-primary font-semibold"
              : ""
          }`}
          onClick={() => handleTabSwitch("past")}
        >
          Past
        </button>
      </div>

      {/* Display respective content based on active tab */}
     
        {currentHackathons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 sm:mt-6 w-full">
            {      currentHackathons.map((hackathon) => (
                    <div
                      key={hackathon._id}
                      onClick={() => handleCardClick(hackathon._id)}
                      className="bg-white shadow-md p-4 rounded-lg hover:cursor-pointer hover:shadow-xl transition-shadow"
                    >
                      {/* Hackathon Image */}
                      {hackathon.banner && (
                           <Image
                           src={hackathon.banner}
                           alt={hackathon.title}
                                      width={1280} // Specify image dimensions
                                      height={400} // Matches aspect ratio of original image
                                     className="w-full h-36 object-cover rounded-t-lg mb-4"
                                      placeholder="blur" // Optimized loading
                                      blurDataURL="/placeholder-image.jpg" // Placeholder for low-quality image preview
                                    />
                    
                      )}
                      {/* Hackathon Title */}
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {hackathon.title}
                      </h3>
                      {/* Location */}
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Location:</span>{" "}
                        {hackathon.location}
                      </p>
                      {/* Dates */}
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Dates:</span>{" "}
                        {`${new Date(hackathon.startDate).toLocaleDateString()} - ${new Date(hackathon.endDate).toLocaleDateString()}`}
                      </p>
                      {/* Max Participants */}
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Max Participants:</span>{" "}
                        {hackathon.maxParticipants}
                      </p>
                    </div>
                  ))}
          </div>
        ) : (
          <p className="text-center text-gray-500  my-10">
            {activeTab === "upcoming"
              ? "No upcoming hackathons found."
              : "No past hackathons found."}
          </p>
        )}
    </div>
  );
};

export default Events;

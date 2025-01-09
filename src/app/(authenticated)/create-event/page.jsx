"use client";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// Zod validation schema
const hackathonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  banner: z.string().optional(),
  prizes: z.number().optional(),
  maxParticipants: z.number().min(1, "Max participants is required"),
});

const Page = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [hackathons, setHackathons] = useState([]);
  const { user } = useSelector((state) => state.user);


  const fetchHackathons = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hackathons?userId=${user?.userId}`);

    if (res.ok) {
      const data = await res.json();
      setHackathons(data);
    } else {
      console.error("Failed to fetch hackathons");
    }
  };

  const handleCreated = async () => {
    await fetchHackathons();
    setActiveTab("created");
  };

  useEffect(() => {
    if (user?.userId) {
      fetchHackathons();
    }
  }, [user?.userId]);

  return (
    <div className="w-full flex justify-center items-center flex-col">
      {/* Tab Bar */}
      <div className="flex justify-start border-b border-textSecondary">
        <button
          className={`px-4 py-2 ${
            activeTab === "create"
              ? "border-b-2 border-primary text-primary font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create Event
        </button>
        <button
          className={`ml-4 px-4 py-2 ${
            activeTab === "created"
              ? "border-b-2 border-primary text-primary font-semibold"
              : ""
          }`}
          onClick={handleCreated}
        >
          Created
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-3 sm:mt-6 w-full">
        {activeTab === "create" ? (
          <CreateEventForm />
        ) : (
          <CreatedHackathons hackathons={hackathons} />
        )}
      </div>
    </div>
  );
};

// Form for creating a hackathon
const CreateEventForm = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    banner: "",
    prizes: null, // Change prizes to number type and initialize to 0
    maxParticipants: null,
  });
  const [isCreating, setisCreating] = useState(false)
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "prizes" || name === "maxParticipants" ? Number(value) : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validate with Zod
    const result = hackathonSchema.safeParse(formData);
    
    if (!result.success) {
      const errorObj = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(errorObj);
      return;
    }
    setisCreating(true)
    let form = { ...formData, createdBy: user?.userId };

    // Send data to the backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hackathons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Hackathon Created");
      setFormData({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        banner: "",
        prizes: null, // Reset prizes to 0
        maxParticipants: null,
      });
    } else {
      toast.error("Failed to create hackathon");
    }
    setisCreating(false)
  };

  return (
    <form
      className="w-full mx-auto sm:w-[600px] shadow-default p-2 sm:p-6 rounded"
      onSubmit={onSubmit}
    >
      <h2 className="text-large font-semibold text-white">Create Hackathon</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
        <div className="flex flex-col">
          <label className="block text-white">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="text-black w-full border border-textSecondary rounded p-2 mt-1"
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="block text-white">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="text-black w-full border border-textSecondary rounded p-2 mt-1"
            placeholder="Online or specify venue"
          />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">{errors.location}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <label className="block text-white">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border border-textSecondary rounded p-2 text-black"
          />
          {errors.startDate && (
            <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="block text-white">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border border-textSecondary rounded p-2 text-black"
          />
          {errors.endDate && (
            <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 mt-4">
        <div className="flex flex-col">
          <label className="block text-white">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="text-black w-full border border-textSecondary rounded p-2 mt-1"
            rows="4"
            placeholder="Enter event description"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="flex flex-col mt-4">
          <label className="block text-white">Banner</label>
          <input
            type="text"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            className="text-black w-full border border-textSecondary rounded p-2 mt-1"
            placeholder="Image URL for Banner"
          />
          {errors.banner && (
            <p className="text-sm text-red-500 mt-1">{errors.banner}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col mt-4">
            <label className="block text-white">Prizes</label>
            <input
              type="number"
              name="prizes"
              value={formData.prizes}
              onChange={handleChange}
              className="text-black w-full border border-textSecondary rounded p-2 mt-1"
              placeholder="Enter prizes as a number"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="block text-white">Max Participants</label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              className="text-black w-full border border-textSecondary rounded p-2 mt-1"
              placeholder="Maximum participants"
            />
            {errors.maxParticipants && (
              <p className="text-sm text-red-500 mt-1">
                {errors.maxParticipants}
              </p>
            )}
          </div>
        </div>
      </div>

      <PrimaryBtn type="submit" btnText={isCreating?"Creating...":"Create"} btnClass="mt-6 w-full py-2" />
    </form>
  );
};

// List of created hackathons
const CreatedHackathons = ({ hackathons }) => {
  return (
    <div className="w-full px-2 sm:px-4">
      {hackathons.length === 0 ? (
        <p className="text-center text-white">
          No created hackathons available
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {hackathons &&
            hackathons.map((hackathon) => (
              <div
                key={hackathon._id}
                className="bg-white shadow-lg p-3 sm:p-6 rounded-lg border border-gray-300 w-[95%] sm:w-[85%] md:w-[400px] mx-auto mb-6 transition-transform transform  hover:shadow-xl hover:border-primary"
              >
                {/* Hackathon Image */}
                {hackathon.banner && (
                  <img
                    src={hackathon.banner}
                    alt={hackathon.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4 shadow-md"
                  />
                )}

                <h3 className="text-lg sm:text-2xl font-semibold text-primary mb-3 tracking-wide">
                  {hackathon.title}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium text-primary">Location:</span>{" "}
                  {hackathon.location}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-medium text-primary">Dates:</span>{" "}
                  {`${new Date(
                    hackathon.startDate
                  ).toLocaleDateString()} - ${new Date(
                    hackathon.endDate
                  ).toLocaleDateString()}`}
                </p>

                <p className="text-sm text-gray-700 mb-4">
                  {hackathon.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-primary">
                      Max Participants:
                    </span>{" "}
                    {hackathon.maxParticipants}
                  </p>

                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-primary">
                      Created By:
                    </span>{" "}
                    {hackathon.createdByName}
                  </p>
                </div>

                {/* Prizes */}
                {hackathon.prizes && (
                  <div className="bg-gray-100 p-4 rounded mt-4">
                    <h4 className="font-semibold text-md text-primary">
                      Prizes:{" "}
                      <span className="list-disc pl-6 mt-2 text-sm text-gray-700 space-y-1">
                        Rs&nbsp;{hackathon.prizes}
                      </span>
                    </h4>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Page;

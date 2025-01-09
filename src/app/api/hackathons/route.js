import connectMongo from "@/app/lib/db";
import Hackathon from "@/app/lib/model/Hackathon";
import User from "@/app/lib/model/User";  
import { revalidateTag } from "next/cache";  // Importing the cache revalidation utility

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongo();
    const {
      banner,
      title,
      description,
      location,
      prizes,
      startDate,
      endDate,
      createdBy,
      maxParticipants,
    } = await req.json();

    // Validate required fields
    if (!title || !description || !startDate || !endDate || !createdBy) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Check if endDate is after startDate
    if (new Date(endDate) < new Date(startDate)) {
      return new Response(
        JSON.stringify({ message: 'End date cannot be before start date' }),
        { status: 400 }
      );
    }

    // Create a new Hackathon instance
    const hackathon = new Hackathon({
      banner,
      title,
      description,
      location,
      prizes,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      createdBy,
      maxParticipants,
    });

    // Save the Hackathon to the database
    const savedHackathon = await hackathon.save();

    // Revalidate the cache for hackathons
    revalidateTag('hackathons');  // Add revalidation to force refresh cache for hackathons

    return new Response(JSON.stringify(savedHackathon), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
export async function GET(req) {
  try {
    await connectMongo();

    // Extract userId from the query parameter
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const userId = searchParams.get('userId');  // Extract 'userId' from query

    // Ensure userId is provided
    if (!userId) {
      return new Response(
        JSON.stringify({ message: 'User ID is required' }),
        { status: 400 }
      );
    }

    // Fetch user name from the User collection
    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }

    // Fetch hackathons created by the user
    const hackathons = await Hackathon.find({ createdBy: userId });

    // If no hackathons are found
    if (hackathons.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No hackathons found for this user' }),
        { status: 404 }
      );
    }

    // Adding user's name to each hackathon object
    const responseHackathons = hackathons.map(hackathon => ({
      ...hackathon.toObject(),
      createdByName: user.name,  // Assuming the user's name is in 'name' field
    }));

    return new Response(JSON.stringify(responseHackathons), {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=60',  // Adjust cache duration as needed
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
}



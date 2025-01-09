import connectMongo from '@/app/lib/db'; // Connection utility for MongoDB
import Hackathon from '@/app/lib/model/Hackathon'; // The Hackathon model
import { NextResponse } from 'next/server';

// Handler function to check if the user is already registered
export async function GET(req, { params }) {
 // Extract the hackathonId and userId from query parameters
 const { searchParams } = new URL(req.url);
 const hackathonId = searchParams.get('hackathonId');
 const userId = searchParams.get('userId');

  if (!hackathonId || !userId) {
    // Return 400 if hackathonId or userId is missing
    return NextResponse.json({ message: 'Hackathon ID and User ID are required' }, { status: 400 });
  }

  try {
    // Connect to the MongoDB database
    await connectMongo();

    // Find the hackathon by ID
    const hackathon = await Hackathon.findById(hackathonId);

    if (!hackathon) {
      // If the hackathon doesn't exist
      return NextResponse.json({ message: 'Hackathon not found' }, { status: 404 });
    }

    // Check if the userId is in the participants list
    const isRegistered = hackathon.participants.includes(userId);

    return NextResponse.json({ isRegistered }, { status: 200 });
  } catch (error) {
    console.error('Error checking registration:', error);
    return NextResponse.json({ message: 'Server error, please try again later' }, { status: 500 });
  }
}
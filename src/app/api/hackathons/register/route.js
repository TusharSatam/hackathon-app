import connectMongo from '@/app/lib/db';
import Hackathon from '@/app/lib/model/Hackathon';
import User from '@/app/lib/model/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const url = new URL(req.url);
    const eventId = url.searchParams.get('eventId');
    const userId = url.searchParams.get('userId');
  
    console.log("eventId", eventId);
    console.log("userId", userId);
    if (!eventId || !userId) {
      return NextResponse.json(
        { message: 'Event ID and User ID are required' },
        { status: 400 }
      );
    }

    // Connect to the MongoDB database
    await connectMongo();

    // Fetch the hackathon event by eventId
    const hackathon = await Hackathon.findById(eventId);
    if (!hackathon) {
      return NextResponse.json({ message: 'Hackathon not found' }, { status: 404 });
    }

    // Fetch the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the user is already registered for the hackathon
    if (hackathon.participants.includes(userId)) {
      return NextResponse.json(
        { message: 'You are already registered for this hackathon' },
        { status: 400 }
      );
    }

    // Check if the hackathon has reached the max participants
    if (hackathon.maxParticipants && hackathon.participants.length >= hackathon.maxParticipants) {
      return NextResponse.json(
        { message: 'Hackathon has reached the maximum participant limit' },
        { status: 400 }
      );
    }

    // Add the user to the participants list
    hackathon.participants.push(userId);
    await hackathon.save();

    // Optionally, associate this hackathon with the user's participated hackathons
    user.participatedHackathons.push(hackathon._id);
    await user.save();

    return NextResponse.json({ message: 'Successfully registered for the hackathon' }, { status: 200 });
  } catch (error) {
    console.error('Error registering for hackathon:', error);
    return NextResponse.json(
      { message: 'Server error, please try again later' },
      { status: 500 }
    );
  }
}

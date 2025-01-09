import connectMongo from '@/app/lib/db';
import Hackathon from '@/app/lib/model/Hackathon';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectMongo();

    // Find the hackathon by ID
    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return NextResponse.json({ message: 'Hackathon not found' }, { status: 404 });
    }

    return NextResponse.json(hackathon, { status: 200 });
  } catch (error) {
    console.error('Error fetching hackathon:', error);
    return NextResponse.json({ message: 'Server error, please try again later' }, { status: 500 });
  }
}


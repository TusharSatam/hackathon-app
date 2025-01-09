import connectMongo from "@/app/lib/db";
import Hackathon from "@/app/lib/model/Hackathon";

export async function GET(req) {
  try {
    await connectMongo();

    // Fetch all hackathons that are in the past (endDate is in the past)
    const currentDate = new Date();
    const pastHackathons = await Hackathon.find({ endDate: { $lt: currentDate } });

    if (pastHackathons.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No past hackathons found' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(pastHackathons), {
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

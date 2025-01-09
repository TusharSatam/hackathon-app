import connectMongo from "@/app/lib/db";
import Hackathon from "@/app/lib/model/Hackathon";

export async function GET(req) {
    try {
      await connectMongo();
  
      // Fetch all hackathons that are upcoming (startDate is in the future)
      const currentDate = new Date();
      
      const upcomingHackathons = await Hackathon.find({ startDate: { $gte: currentDate } });
  
      if (upcomingHackathons.length === 0) {
        return new Response(
          JSON.stringify({ message: 'No upcoming hackathons found' }),
          { status: 404 }
        );
      }
  
      return new Response(JSON.stringify(upcomingHackathons), {
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
  
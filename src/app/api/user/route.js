import jwt from 'jsonwebtoken';

// Replace with your actual environment variable
const SECRET_KEY = process.env.JWT_SECRET; 

// Create the GET method
export async function GET(req) {
  try {
    // Extract token from the Authorization header
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Expected format: Bearer <JWT_TOKEN>

    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Token is missing' }),
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Assuming token contains user details
    const userDetails = decoded;

    return new Response(
      JSON.stringify({ user: userDetails }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response(
      JSON.stringify({ message: 'Invalid or expired token' }),
      { status: 401 }
    );
  }
}

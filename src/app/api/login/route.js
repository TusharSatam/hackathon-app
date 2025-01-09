import User from '@/app/lib/model/User';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // MongoDB Connection
    if (!mongoose.connection.readyState) {
      console.log('Connecting to MongoDB...');
      try {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
      } catch (dbError) {
        console.error('MongoDB connection error:', dbError);
        return NextResponse.json(
          { success: false, message: 'Database connection failed' },
          { status: 500 }
        );
      }
    }

    // Find User by Email
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found for email:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare Passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.error('Incorrect password for email:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '20000h' }
    );

    // Return the authToken in the response
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,  // Returning the JWT token
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import PrimaryBtn from '@/components/Buttons/PrimaryBtn';
import authChecker from '@/utils/authChecker';

// Zod schema for validation
const registrationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();
  authChecker();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});

    // Validate inputs using Zod
    const result = registrationSchema.safeParse({ name, email, password, confirmPassword });

    if (!result.success) {
      const errorData = {};
      result.error.errors.forEach((err) => {
        errorData[err.path[0]] = err.message;
      });
      setErrors(errorData);
      return;
    }

    // Proceed to send the form data to the API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.success) {
      router.push('/home');
    } else {
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center p-4 sm:p-8  rounded-lg shadow-lg">
<div className='flex flex-col w-[90%] sm:w-[500px]'>
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium font">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-lg font-medium">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="text-black mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-center gap-4 mt-6">
          <PrimaryBtn btnText={"Register"} type={"submit"} btnClass={"!w-full"}/>
        </div>
      </form>

      <p className="text-center mt-4 text-sm text-gray-500">
        Already have an account?{' '}
        <span
          onClick={() => router.push('/login')}
          className="text-primary cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>
      </div>
    </div>
  );
}

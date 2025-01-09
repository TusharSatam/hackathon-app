'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryBtn from '@/components/Buttons/PrimaryBtn';
import { useDispatch } from 'react-redux';
import authChecker from '@/utils/authChecker';
import { setUser } from '@/redux/slice/user';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();  // Dispatch to Redux
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error('API error:', data.message);
        throw new Error(data.message || 'Failed to login');
      }

      // Save the authToken in localStorage
      if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
          // Dispatch user data to Redux
                 dispatch(setUser(data.user));
      }

      router.push('/home'); // Redirect after login
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  authChecker();
  return (
    <div className="h-screen w-screen flex justify-center items-center p-4 sm:p-8">
      <div className="flex flex-col w-[90%] sm:w-[500px] p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Submit Button */}
          <div className="flex justify-center gap-4 mt-6">
            <PrimaryBtn
              btnText={loading ? 'Logging in...' : 'Login'}
              type="submit"
              btnClass="!w-full"
              disabled={loading}
            />
          </div>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Don’t have an account?{' '}
          <span
            onClick={() => router.push('/register')}
            className="text-primary cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryBtn from '@/components/Buttons/PrimaryBtn';
import SecondaryBtn from '@/components/Buttons/SecondaryBtn';

export default function App() {
  const router = useRouter();

  // Function to check if token is present in localStorage
  const checkUserSession = () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    return token ? true : false;
  };

  useEffect(() => {
    // Check for token (logged-in state)
    if (checkUserSession()) {
      // Redirect to home page if the user is authenticated
      router.push('/home');
    }
  }, [router]);

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r ">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-6">
          Welcome to the Hackathon Management App
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Join, create, and participate in exciting hackathon events. Let’s innovate together!
        </p>

        <div className="flex justify-center gap-6 md:flex-row flex-col">
          {/* Login Button */}
          <PrimaryBtn onClick={() => router.push('/login')} btnText={"Login"} />
          {/* Register Button */}
          <SecondaryBtn onClick={() => router.push('/register')} btnText={"Register"} />
        </div>
      </div>
    </div>
  );
}

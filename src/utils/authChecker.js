// utils/authChecker.js

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const authChecker = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Redirect to home or any other page if user is already logged in
      router.push('/home');
    }
  }, [router]);

};

export default authChecker;

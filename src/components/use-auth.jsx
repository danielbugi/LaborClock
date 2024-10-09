import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const useAuth = () => {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoaded(true);
    }
  }, [status]);

  return { session, isLoaded, isAuthenticated: status === 'authenticated' };
};
export default useAuth;

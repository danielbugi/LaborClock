'use client';

import useAuth from '@/components/use-auth';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const { session, isAuthenticated } = useAuth();

  if (isAuthenticated && !userInfo) {
    setUserInfo(session.user);
  } else if (!isAuthenticated && userInfo) {
    setUserInfo(null);
  }

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

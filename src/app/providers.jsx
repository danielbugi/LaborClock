'use client';

import { LaborProvider } from '@/context/labor-context';
import { UserProvider } from '@/context/user-context';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <UserProvider>
        <LaborProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </LaborProvider>
      </UserProvider>
    </SessionProvider>
  );
}

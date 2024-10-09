'use client';

import { LaborProvider } from '@/context/labor-context';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <LaborProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </LaborProvider>
    </SessionProvider>
  );
}

'use client';
import { Navbar, NavbarBrand, Link } from '@nextui-org/react';

import HeaderAuth from './header-auth';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useLaborContext } from '@/context/labor-context';

function Header() {
  const { data: session, status } = useSession();
  const { setCachedSession, cachedSession } = useLaborContext();

  useEffect(() => {
    if (status === 'authenticated') {
      setCachedSession(session);
    }
  }, [session, setCachedSession, status]);

  return (
    <div className="w-full h-[6rem] flex items-center justify-center">
      {status === 'loading' ? (
        <></>
      ) : (
        <Navbar
          shouldHideOnScroll
          className="max-w-screen-lg mx-auto px-4 bg-slate-300/20 rounded-full mt-4 flex justify-between border border-slate-300"
        >
          <NavbarBrand>
            <Link href="/">
              <h1 className="font-bold text-black text-lg">LaborClock</h1>
            </Link>
          </NavbarBrand>

          <HeaderAuth
            cachedSession={cachedSession}
            setCachedSession={setCachedSession}
          />
        </Navbar>
      )}
    </div>
  );
}
export default Header;

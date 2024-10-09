// Header.js
'use client';

import { Navbar, NavbarBrand, Link } from '@nextui-org/react';
import { Skeleton } from '@nextui-org/skeleton';

import HeaderAuth from './header-auth';
import useDarkMode from './use-darkmode';
import useAuth from './use-auth';

function Header() {
  const { isLoaded: isAuthLoaded, isAuthenticated } = useAuth();
  const { isLoaded: isDarkModeLoaded } = useDarkMode();

  const isFullyLoaded = isAuthLoaded && isDarkModeLoaded;

  if (!isFullyLoaded) {
    return (
      <Navbar className="max-w-screen-lg mx-auto px-4 bg-slate-300/20 rounded-full flex justify-between border border-slate-300 dark:border-gray-700 dark:bg-gray-600 dark:bg-opacity-20 dark:text-white">
        <NavbarBrand>
          <Link href="/">
            <h1 className="font-bold text-black text-md sm:text-lg dark:text-white">
              LaborClock
            </h1>
          </Link>
        </NavbarBrand>
      </Navbar>
    );
  }

  return (
    <Navbar
      shouldHideOnScroll
      className="max-w-screen-lg mx-auto px-4 bg-slate-300/20 rounded-full flex justify-between border border-slate-300 dark:border-gray-700 dark:bg-gray-600 dark:bg-opacity-20 dark:text-white"
    >
      <NavbarBrand>
        <Link href="/">
          <h1 className="font-bold text-black text-md sm:text-lg dark:text-white">
            LaborClock
          </h1>
        </Link>
      </NavbarBrand>
      <HeaderAuth />
    </Navbar>
  );
}

export default Header;

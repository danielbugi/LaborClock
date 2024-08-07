'use client';

import { useLaborContext } from '@/context/labor-context';
import {
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';

import { signOut } from 'next-auth/react';

function HeaderAuth({ cachedSession, setCachedSession }) {
  const { selectedMonth, selectedYear } = useLaborContext();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    setCachedSession(null);
  };

  let authContent;

  if (cachedSession?.user) {
    authContent = (
      <Popover placement="left-start">
        <NavbarContent justify="end">
          <PopoverTrigger>
            <Button color="primary" variant="flat">
              Hello, {cachedSession.user.name}
            </Button>
          </PopoverTrigger>
        </NavbarContent>

        <PopoverContent className="flex flex-col items-start gap-4 p-4 pr-10">
          <Link href={`/counter/${selectedYear}/${selectedMonth}`}>
            <NavbarItem>My List</NavbarItem>
          </Link>
          <Link href={`/profile/${cachedSession.user.id}`}>
            <NavbarItem>My Profile</NavbarItem>
          </Link>
          <Link href="/dashboard">
            <NavbarItem>Dashboard</NavbarItem>
          </Link>
          <NavbarItem>
            <Button color="primary" variant="flat" onClick={handleLogout}>
              Logout
            </Button>
          </NavbarItem>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    );
  }

  return authContent;
}
export default HeaderAuth;

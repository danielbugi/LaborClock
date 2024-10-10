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

import DarkModeSwitch from './darkmode-switch';
// import useAuth from './use-auth';
import useDarkMode from './use-darkmode';
import { useLaborContext } from '@/context/labor-context';
import { useUserContext } from '@/context/user-context';

function HeaderAuth() {
  const { userInfo } = useUserContext();

  const { isDark } = useDarkMode();

  const { selectedMonth, selectedYear } = useLaborContext();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (!userInfo) {
    return (
      <NavbarContent justify="end">
        <NavbarItem>
          <Link className="text-sm" href="/login">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/register"
            variant="flat"
            className="text-sm"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    );
  }

  return (
    <Popover placement="bottom-end">
      <NavbarContent justify="end">
        <PopoverTrigger>
          <Button color="primary" variant="light" className="p-0 w-fit">
            {userInfo.name}
          </Button>
        </PopoverTrigger>
      </NavbarContent>

      <PopoverContent className="w-64">
        <div className="py-2 px-4 w-full">
          <nav className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <p>Hello, {userInfo.name}</p>
              <Link
                href={`/counter/${selectedYear}/${selectedMonth}`}
                className="text-sm"
              >
                My List
              </Link>
              <Link href={`/profile/${userInfo.id}`} className="text-sm">
                My Profile
              </Link>
            </div>
            <div className="flex items-center justify-between mt-2">
              <DarkModeSwitch />
              <Button
                color="primary"
                variant="flat"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default HeaderAuth;

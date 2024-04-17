import Link from '@/components/Link';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useState } from 'react';
import {
  CheckBadgeIcon,
  ArrowRightStartOnRectangleIcon as LogOutIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import useShowDropdown from '@/utils/useShowDropdown';

const Navbar = () => {
  const [user, setUser] = useState(true);
  const { ref, showDropdown, setShowDropdown } = useShowDropdown();

  return (
    <header className="w-full border-b  p-4 text-primary dark:bg-black dark:text-night-primary">
      <div className="mx-auto flex max-w-screen-2xl justify-between">
        <div className="flex items-center gap-1">
          <CheckBadgeIcon className="h-6 w-6" />
          <p className=" text-lg font-bold">todolist</p>
        </div>
        <nav className="flex items-center gap-2">
          <ThemeSwitcher />
          {user ? (
            <div ref={ref} className="relative">
              {' '}
              <button
                className="font-semibold text-primary underline underline-offset-2 dark:text-night-primary"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Hello, User
              </button>
              {showDropdown && <Dropdown />}
            </div>
          ) : (
            <Link href="/">Log In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

const Dropdown = () => {
  type Props = {
    children: React.ReactNode;
  };

  const DropdownItem = ({ children }: Props) => (
    <li className="first:border-b hover:bg-hover-light dark:border-gray-dark dark:hover:bg-night-hover-light ">
      <a
        className="flex gap-2 px-3 py-3 font-semibold text-gray-dark dark:text-gray-light"
        href="/"
      >
        {children}
      </a>
    </li>
  );

  return (
    <div className="top-100 absolute right-0 min-w-[150px] rounded-md border border-gray-light bg-white shadow-sm dark:border-gray-dark dark:bg-black">
      <ul>
        <DropdownItem>
          <UserIcon className="h-6 w-6" />
          Edit profile
        </DropdownItem>

        <DropdownItem>
          <LogOutIcon className="h-6 w-6" />
          Log out
        </DropdownItem>
      </ul>
    </div>
  );
};

export default Navbar;

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
    <header className="dark:border-night-border dark:bg-night-nav h-[60px] w-full  border-b p-4">
      <div className="mx-auto flex max-w-screen-2xl justify-between">
        <div className="flex items-center gap-1 text-primary dark:text-night-primary">
          <CheckBadgeIcon className="h-6 w-6" />
          <p className="text-lg font-bold">todolist</p>
        </div>
        <nav className="flex items-center gap-2 dark:text-white">
          <ThemeSwitcher />
          {user ? (
            <div ref={ref} className="relative">
              {' '}
              <button
                className="font-semibold underline underline-offset-2 "
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
    <li className="hover:bg-hover dark:border-night-border dark:hover:bg-night-hover first:border-b">
      <a
        className="dark:text-night-gray-text flex gap-2 px-3 py-3 font-semibold"
        href="/"
      >
        {children}
      </a>
    </li>
  );

  return (
    <div className="top-100 dark:border-night-border dark:bg-night-nav absolute right-0 min-w-[150px] rounded-md border bg-white shadow-sm">
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

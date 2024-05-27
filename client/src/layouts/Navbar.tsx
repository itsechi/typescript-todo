import {
  CheckBadgeIcon,
  ArrowRightStartOnRectangleIcon as LogOutIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from '@/components/Link';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useClickOutside } from '@/hooks/useClickOutside';
import { User } from '@/types';

type NavbarProps = {
  user: User;
};

const Navbar = ({ user }: NavbarProps) => {
  const { ref, isVisible, setIsVisible } = useClickOutside();

  return (
    <header className="h-[60px] w-full border-b p-4  dark:border-night-border dark:bg-night-nav">
      <div className="mx-auto flex max-w-screen-2xl justify-between">
        <div className="flex items-center gap-1 text-primary dark:text-night-primary">
          <CheckBadgeIcon className="h-6 w-6" />
          <p className="text-lg font-bold">todolist</p>
        </div>
        <nav className="flex items-center gap-2 dark:text-white">
          <ThemeSwitcher />
          {user ? (
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className="relative"
            >
              {' '}
              <button
                className="font-semibold underline underline-offset-2 "
                onClick={() => setIsVisible(!isVisible)}
              >
                Hello, {user.displayName}
              </button>
              {isVisible && <Dropdown />}
            </div>
          ) : (
            <Link href={`${import.meta.env.VITE_API_URL}auth/google`}>
              <span className="text-black dark:text-white">Log In</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

const Dropdown = () => {
  type DropdownProps = {
    children: React.ReactNode;
    href: string;
  };

  const DropdownItem = ({ children, href }: DropdownProps) => (
    <li className="first:border-b hover:bg-hover dark:border-night-border dark:hover:bg-night-hover">
      <a
        className="flex gap-2 px-3 py-3 font-semibold dark:text-night-gray-text"
        href={href}
      >
        {children}
      </a>
    </li>
  );

  return (
    <div className="top-100 absolute right-0 min-w-[150px] rounded-md border bg-white shadow-sm dark:border-night-border dark:bg-night-nav">
      <ul>
        <DropdownItem href="/">
          <UserIcon className="h-6 w-6" />
          Edit profile
        </DropdownItem>

        <div onClick={() => localStorage.removeItem('LISTS')}>
          <DropdownItem href={`${import.meta.env.VITE_API_URL}loggedOut`}>
            <LogOutIcon className="h-6 w-6" />
            Log out
          </DropdownItem>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

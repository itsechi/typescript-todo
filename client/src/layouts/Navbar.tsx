import {
  CheckBadgeIcon,
  ArrowRightStartOnRectangleIcon as LogOutIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from '@/components/Link';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useListStore, useUserStore } from '@/hooks/useContext';

const Navbar = () => {
  const { ref, isVisible, setIsVisible } = useClickOutside();
  const { user } = useUserStore();

  return (
    <header className="h-[60px] w-full border-b p-4 dark:border-night-border dark:bg-night-nav">
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
            <Link href={`${import.meta.env.VITE_API_URL}api/auth/google`}>
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
    href?: string;
    onClick?: () => void;
  };

  const { setLists } = useListStore();
  const handleLogout = () => {
    setLists([]);
    localStorage.removeItem('token');
    window.location.href = `${import.meta.env.VITE_API_URL}api/logout`;
  };

  const DropdownItem = ({ children, href, onClick }: DropdownProps) => (
    <li className="first:border-b hover:bg-hover dark:border-night-border dark:hover:bg-night-hover">
      <a
        className="flex gap-2 px-3 py-3 font-semibold dark:text-night-gray-text"
        href={href}
        onClick={onClick}
      >
        {children}
      </a>
    </li>
  );

  return (
    <div className="top-100 absolute right-0 min-w-[150px] cursor-pointer rounded-md border bg-white shadow-sm dark:border-night-border dark:bg-night-nav">
      <ul>
        <DropdownItem href="/">
          <UserIcon className="h-6 w-6" />
          Edit profile
        </DropdownItem>

        <DropdownItem onClick={handleLogout}>
          <LogOutIcon className="h-6 w-6" />
          Log out
        </DropdownItem>
      </ul>
    </div>
  );
};

export default Navbar;

import Link from '@/components/Link';
import Logo from '@/assets/logo.svg';

const Navbar = () => {
  return (
    <header className="border-light w-full border-b p-4">
      <div className="mx-auto flex max-w-screen-2xl justify-between">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="logo" width={25} height={25} />
          <p className=" text-lg font-bold text-primary">todolist</p>
        </div>
        <nav>
          <Link href="/" text="Log In" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import Link from '@/components/Link';
import Logo from '@/assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" width={25} height={25} />
        <p className="font-bold text-indigo-600 text-lg">todolist</p>
      </div>
      <Link href="/" text="Log In" />
    </nav>
  );
};

export default Navbar;

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

const Link = ({ href, children }: LinkProps) => {
  return (
    <a
      className="dark:text-dark-primary font-semibold text-indigo-600"
      href={href}
    >
      {children}
    </a>
  );
};

export default Link;

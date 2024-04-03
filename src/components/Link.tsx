type Props = {
  href: string;
  text: string;
};

const Link = ({ href, text }: Props) => {
  return (
    <a className="font-semibold text-indigo-600" href={href}>
      {text}
    </a>
  );
};

export default Link;

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavProps {
  containerStyles: string;
  linkStyles: string;
  underlineStyles?: string;
  setOpen?: (value: boolean) => void; // optional
}

const links = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/contact", name: "contact" },
];

const Nav = ({
  containerStyles,
  linkStyles,
  underlineStyles,
  setOpen,
}: NavProps) => {
  const path = usePathname();

  const handleClick = () => {
    if (setOpen) setOpen(false);
  };

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          onClick={handleClick} // ✅ Close on click
          className={`capitalize ${linkStyles}`}
        >
          {link.path === path && (
            <motion.span
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ type: "tween" }}
              layoutId="underline"
              className={`${underlineStyles}`}
            />
          )}
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;

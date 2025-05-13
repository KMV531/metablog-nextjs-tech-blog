"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();

  // Optionally support system theme
  const isDark = theme === "dark";

  return (
    <Link href="/">
      <Image
        src={isDark ? "/assets/Logo_Dark.png" : "/assets/Logo.png"} // Switch logos
        width={80}
        height={80}
        priority
        alt="MetaBlog logo"
        className="rounded-lg"
      />
    </Link>
  );
};

export default Logo;

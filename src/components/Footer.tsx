"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logoSrc =
    theme === "dark" ? "/assets/Logo_Dark_2.png" : "/assets/Logo_Light_2.png";

  return (
    <footer className="bg-[#E8E8EA] py-12 px-6 dark:bg-[#141624]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Grid 1 - About */}
        <div className="flex flex-col space-y-4">
          <h1 className="font-semibold text-[#181A2A] text-lg dark:text-white">
            About
          </h1>
          <p className="text-[#696A75] dark:text-[#97989F] text-base">
            Insights, Guides & News on Tech, Business & More.
          </p>
          <div className="pt-2 space-y-1">
            <p className="text-base text-[#696A75] dark:text-[#97989F]">
              <span className="font-semibold text-[#181A2A] dark:text-white">
                Email :
              </span>{" "}
              info@jstemplate.net
            </p>
            <p className="text-base text-[#696A75] dark:text-[#97989F]">
              <span className="font-semibold text-[#181A2A] dark:text-white">
                Phone :
              </span>{" "}
              880 123 456 789
            </p>
          </div>
        </div>

        {/* Grid 2 - Quick Links */}
        <div className="flex flex-col space-y-3 w-max">
          <h1 className="font-semibold text-[#181A2A] text-lg dark:text-white">
            Quick Links
          </h1>
          <Link
            href={"/"}
            className="text-[16px] text-[#696A75] dark:text-[#97989F] hover:text-black hover:dark:text-white transition"
          >
            Home
          </Link>
          <Link
            href={"/blog"}
            className="text-[16px] text-[#696A75] dark:text-[#97989F] hover:text-black hover:dark:text-white transition"
          >
            Blog
          </Link>
        </div>

        {/* Grid 3 - Categories */}
        <div className="flex flex-col space-y-3 w-max">
          <h1 className="font-semibold text-[#181A2A] text-lg dark:text-white">
            Categories
          </h1>
          {["Technology", "Lifestyle", "Business", "Sports"].map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className="text-base text-[#696A75] dark:text-[#97989F] hover:text-black hover:dark:text-white transition"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Grid 4 - Newsletter */}
        <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-[#242535]">
          <div className="flex flex-col items-center text-center space-y-3">
            <h1 className="font-semibold text-[#181A2A] text-xl dark:text-white">
              Weekly Newsletter
            </h1>
            <p className="text-sm text-[#696A75] dark:text-[#97989F]">
              Get blog articles and offers via email
            </p>
            <Input
              placeholder="Your Email"
              className="border border-[#ccc] w-full dark:bg-[#181A2A] text-white"
            />
            <Button className="bg-[#4B6BFB] hover:text-black text-white w-full mt-2 font-medium cursor-pointer">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-t border-[#D1D1D6] dark:border-[#97989F] max-w-7xl mt-20 mb-5 mx-auto" />
      <div className="flex flex-col space-y-4 lg:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Image src={logoSrc} width={48} height={48} alt="MetaBlog logo" />
          <div className="flex flex-col">
            <p>
              Meta<span className="font-bold">Blog</span>
            </p>
            <p className="text-[#696A75] dark:text-[#97989F]">
              © JS Template {new Date().getFullYear()}. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 text-[#696A75] dark:text-[#97989F]">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

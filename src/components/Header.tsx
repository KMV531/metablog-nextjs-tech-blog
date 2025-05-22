"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Icons
import { SearchIcon, X } from "lucide-react";

// Components
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./Logo";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import UserAuth from "./UserAuth";
import { Search } from "./Search";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Ensure client-side rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Avoid rendering on server
  if (!mounted) return null;

  return (
    <>
      <header
        className={`${
          isScrolled
            ? "py-4 bg-white shadow-lg dark:bg-[#181A2A]"
            : "py-6 dark:bg-[#181A2A]"
        } sticky top-0 z-30 transition-all px-5 lg:px-0 ${
          pathname === "/" ? "bg-white" : ""
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-x-6">
            <Nav
              containerStyles="hidden xl:flex gap-x-8 items-center"
              linkStyles="relative text-[#3B3C4A] hover:text-black dark:text-white transition-all"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-brand-700 cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X size={20} /> : <SearchIcon size={20} />}
            </Button>
            <Search show={searchOpen} onClose={() => setSearchOpen(false)} />
            <ThemeToggle />
            <div className="xl:hidden">
              <MobileNav />
            </div>
            <UserAuth />
          </div>
        </div>
      </header>

      {/* Search Input Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          searchOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } fixed top-[80px] left-0 w-full z-20 bg-white dark:bg-accent shadow-md px-5 lg:px-0`}
      >
        <div className="container mx-auto py-4">
          <Input
            placeholder="Search articles, tutorials, tags..."
            className="w-full border border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>
    </>
  );
};

export default Header;

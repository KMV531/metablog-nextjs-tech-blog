"use client";

import { AlignJustify } from "lucide-react";
import { useState } from "react";

// Components
import Nav from "./Nav";
import Logo from "./Logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTitle className="hidden">Mobile nav</SheetTitle>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col items-center justify-between h-full py-8">
          <div className="flex flex-col items-center gap-y-32">
            <Logo />
            <Nav
              containerStyles="flex flex-col items-center gap-y-6"
              linkStyles="text-2xl"
              setOpen={setOpen} // ✅ Pass it here
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

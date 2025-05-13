"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useTheme } from "next-themes";

// ✅ Only import dark
import { dark } from "@clerk/themes";

const UserAuth = () => {
  const { theme } = useTheme();

  const appearance = theme === "dark" ? { baseTheme: dark } : {}; // light mode uses Clerk's default

  return (
    <ClerkLoaded>
      {/* Signed in user UI */}
      <SignedIn>
        <UserButton appearance={appearance} />
      </SignedIn>

      {/* Signed out user UI */}
      <SignedOut>
        <SignInButton mode="modal" appearance={appearance}>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <User size={20} />
          </Button>
        </SignInButton>
      </SignedOut>
    </ClerkLoaded>
  );
};

export default UserAuth;

"use client";

import Link from "next/link";
import Image from "next/image";
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navitems from "./navitems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={60}
            height={60}
          />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <Navitems />

        {/* <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
    </nav>
  );
};

export default Navbar;
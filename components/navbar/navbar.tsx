"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navitems from "./navitems";

const AuthButtons = dynamic(() => import("./auth-buttons"), { ssr: false });

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={40}
            height={28}
          />
          <span className="text-xl font-extrabold tracking-tight">
            diski<span className=" text-[#8eb69b]">Center</span>
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <Navitems />
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navbar;
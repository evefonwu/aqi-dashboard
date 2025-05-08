"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const pathname = usePathname();
  const baseLink =
    "flex h-[35px] grow items-center justify-center bg-gray-100 text-sm font-medium border-3 border-transparent";

  const focusLink =
    "focus:outline-none focus:relative focus:z-10 focus:border-gray-300";

  return (
    <nav className="flex">
      <Link
        key={1}
        href="/"
        aria-label="Link to About page"
        className={cn(baseLink, "rounded-l-md", focusLink, {
          "bg-teal-700 text-white": pathname === "/",
        })}
      >
        <span>About</span>
      </Link>
      <Link
        key={2}
        href="/dashboard"
        aria-label="Link to Air Quality Dashboard page"
        className={cn(baseLink, focusLink, {
          "bg-teal-700 text-white": pathname === "/dashboard",
        })}
      >
        <span>Air Quality</span>
      </Link>
      <Link
        key={3}
        href="/locations"
        aria-label="Link to Locations page"
        className={cn(baseLink, "rounded-r-md", focusLink, {
          "bg-teal-700 text-white": pathname === "/locations",
        })}
      >
        <span>Locations</span>
      </Link>
    </nav>
  );
}

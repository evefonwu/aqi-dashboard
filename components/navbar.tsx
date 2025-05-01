"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex">
      <Link
        key={1}
        href="/"
        aria-label="Link to About page"
        className={cn(
          "flex h-[35px] grow items-center justify-center gap-3 rounded-l-md bg-gray-100 p-3 text-sm font-medium",
          {
            "bg-teal-700 text-white": pathname === "/",
          }
        )}
      >
        <span>About</span>
      </Link>
      <Link
        key={2}
        href="/dashboard"
        aria-label="Link to Air Quality Dashboard page"
        className={cn(
          "flex h-[35px] grow items-center justify-center gap-3 bg-gray-100 p-3 text-sm font-medium hover:bgtealsky-100 hover:teal-blue-600",
          {
            "bg-teal-700 text-white": pathname === "/dashboard",
          }
        )}
      >
        <span>Air Quality</span>
      </Link>
      <Link
        key={3}
        href="/locations"
        aria-label="Link to Locations page"
        className={cn(
          "flex h-[35px] grow items-center justify-center gap-3 rounded-r-md bg-gray-100 p-3 text-sm font-medium",
          {
            "bg-teal-700 text-white": pathname === "/locations",
          }
        )}
      >
        <span>Locations</span>
      </Link>
    </nav>
  );
}

"use client";

import { navbarData } from "@/utils/navbar";
import Link from "next/link";
import { Button } from "../../button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import User from "./User";
import MobileNavbar from "./MobileNavbar";
import { ShoppingBagIcon } from "@/utils/Icons";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <header className="bg-white h-[96px]">
      <nav className="h-full container flex items-center justify-between">
        <h1 className="text-title text-2xl md:text-4xl font-bold">
          <Link href={"/"}>LOGO</Link>
        </h1>
        <ul className="md:flex hidden items-center gap-6 lg:gap-12">
          {navbarData?.map((item) => (
            <li key={item.id}>
              <Link
                className={cn(
                  "text-xl hover:text-primary transition-all font-medium text-paragraph",
                  pathName === item.path && "text-primary"
                )}
                href={item.path}
              >
                {item.label}
              </Link>
            </li>
          ))}

        </ul>
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/shop">
            <Button className="rounded md:flex hidden items-center gap-2 ">
              <span>
                <ShoppingBagIcon />
              </span>{" "}
              Shop Now
            </Button>
          </Link>
          <User />
          <MobileNavbar />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

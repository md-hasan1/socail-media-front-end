import { useState } from "react";
import { Button } from "../../button";
import { IoIosMenu } from "react-icons/io";
import { navbarData } from "@/utils/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AiOutlineClose } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";

const MobileNavbar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="md:hidden block">
      <Button onClick={handleClose} className="text-2xl" variant={"ghost"}>
        <IoIosMenu />
      </Button>
      <div
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity .7s ease, visibility .3s ease",
        }}
        className="fixed h-screen z-[200] top-0 left-0 w-full bg-white/80 backdrop-blur grid place-content-center"
      >
        <ul className="flex flex-col gap-6 items-center ">
          {navbarData?.map((item) => (
            <li key={item.id}>
              <Link
                onClick={handleClose}
                className={cn(
                  "text-lg font-medium text-paragraph hover:to-primary-DEFAULt transition-all active:text-primary-DEFAULt",
                  pathName === item.path && "text-primary-DEFAULT"
                )}
                href={item.path}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Button className="rounded-none flex  items-center gap-2 ">
              <span>
                <IoBagOutline />
              </span>{" "}
              Shop Now
            </Button>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <div className="absolute top-5 right-5">
            <Button
              onClick={handleClose}
              className="rounded-full p-0 text-2xl  size-10 flex items-center justify-center"
              variant={"ghost"}
            >
              <AiOutlineClose />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;

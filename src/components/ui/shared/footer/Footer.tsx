import Link from "next/link";
import {
  FaceBookIconFooter,
  InstagramIconFooter,
  LinkedinIconFooter,
  TwitterIconFooter,
} from "@/utils/Icons";
import { footerDataQuickLinks } from "@/utils/footer";

export default function Footer() {
  return (
    <footer className="bg-slate-600 pt-20 pb-6">
      <div className="container ">
        <div className="flex sm:flex-row flex-col  gap-6 pb-6 ">
          <div className="">
            <h2 className="uppercase font-bold text-5xl text-white mb-6">
              Logo
            </h2>
            <p className="text-gray-200 text-xl leading-[160%] mb-6 ">
              Scan a Turning Hearts Medallion to learn about and interact with
              those who have passed on. You can also begin documenting the
              legacy you wish to leave behind.
            </p>
            <div>
              <h3 className="mb-4 text-lg font-medium leading-[160%] text-white">
                Social Media:
              </h3>
              <ul className="flex items-center gap-3">
                <li>
                  <Link href={"/"}>
                    <TwitterIconFooter />
                  </Link>
                </li>
                <li>
                  <Link href={"/"}>
                    <InstagramIconFooter />
                  </Link>
                </li>
                <li>
                  <Link href={"/"}>
                    <LinkedinIconFooter />
                  </Link>
                </li>
                <li>
                  <Link href={"/"}>
                    <FaceBookIconFooter />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className=" w-full flex flex-col md:flex-row md:justify-between gap-6 ">
            <div>
              <h2 className="font-medium text-2xl leading-[160%] text-white mb-4">
                Quick Link
              </h2>
              <ul className="flex flex-col gap-4">
                {footerDataQuickLinks?.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="text-lg text-white leading-[120%] hover:text-gray-300 transition-all"
                      href={item.path}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="font-medium text-2xl leading-[160%] text-white mb-4">
                Contact Us
              </h2>
              <p className="text-lg text-gray-200">(316) 555-0116</p>
              <p className="text-lg text-gray-200">deanna.curtis@example.com</p>
            </div>
          </div>
        </div>
        <div className="border-t">
          <p className="mt-6 text-white text-sm font-medium">
            © [2024] Ash and Fire. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import React from "react";

function MobileNav({ navLinks }) {
  return (
    <div className="absolute top-[calc(100%)] w-full lg:hidden">
      <div className="container">
        <div className="rounded-md bg-popover shadow-md border flex flex-col p-2">
          {navLinks.map((item, index) => (
            <>
              {index ? <div className="h-[1px] bg-gray-200"></div> : <></>}

              <div className="flex">
                <Link
                  key={index}
                  href={item.href}
                  className="hover:text-primary p-2"
                >
                  {item.title}
                </Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileNav;

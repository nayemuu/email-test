import Link from "next/link";
import React from "react";

const SearchedItem = ({ blog, clearSearchResults }) => {
  return (
    <Link href={`/blog/${blog.id}`} onClick={clearSearchResults}>
      <div
        className={`bg-[#FFFFFF] rounded-[10px] flex hover:border-2  hover:border-primary h-[80px] cursor-pointer`}
      >
        <div className="flex justify-start items-center h-full w-auto rounded-[15px]  aspect-[53/49]">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="h-full w-full object-cover rounded-xl"
          />
        </div>

        <div className="px-[10px] flex items-center">
          <div className="text-xs font-medium leading-[14.32px] line-clamp-2 pb-1">
            {blog.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchedItem;

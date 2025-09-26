"use client";

import { useGetBlogDetailsQuery } from "@/redux/features/blogs/blogsApi";
import React, { useEffect } from "react";
import Blog from "./Blog";
import { PulseLoader } from "react-spinners";

const BlogSection = ({ id }) => {
  const { isLoading, isError, isSuccess, data, error, isFetching } =
    useGetBlogDetailsQuery(id);

  //   useEffect(() => {
  //     if (isSuccess) {
  //       console.log("data = ", data.data);
  //     }
  //   }, [data]);

  return isSuccess && data?.data ? (
    <Blog blog={data.data} />
  ) : (
    <div className="w-full h-full flex justify-center items-center mt-[200px]">
      <PulseLoader color="#43bfc7" />
    </div>
  );
};

export default BlogSection;

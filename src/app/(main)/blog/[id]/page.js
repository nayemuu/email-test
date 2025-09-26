import Blog from "@/components/main/pages/Blog/Blog";
import BlogSection from "@/components/main/pages/Blog/BlogSection";
import React from "react";

const page = async ({ params }) => {
  let { id } = await params;
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/${id}`,
  //   { cache: "no-store" }
  // );

  // const data = await response.json();

  return (
    <div>
      {/* <Blog blog={data.data} /> */}

      <BlogSection id={id} />
    </div>
  );
};

export default page;

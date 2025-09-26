import UpdateBlogForm from "@/components/main/pages/UpdateBlog/UpdateBlogForm";

const page = async ({ params }) => {
  let { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/${id}`,
    { cache: "no-store" }
  );

  const data = await response.json();

  return (
    <div className="container">
      {data?.data ? <UpdateBlogForm blog={data.data} /> : <></>}
    </div>
  );
};

export default page;

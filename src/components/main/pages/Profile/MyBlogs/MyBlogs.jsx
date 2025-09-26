"use client";

import ReuseableBlogsListWithPaginations from "@/components/main/reuseable/ReuseableBlogsListWithPaginations/ReuseableBlogsListWithPaginations";
import { useGetMyBlogsQuery } from "@/redux/features/blogs/blogsApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "./MyBlogs.css";
import { useSelector } from "react-redux";

const MyBlogs = () => {
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [initialPage, setInitialPage] = useState(0); // Initialize initialPage state
  const [pageCount, setPageCount] = useState(0);
  const [jumpToPage, setJumpToPage] = useState("");
  const { name } = useSelector((state) => state.profile);

  const { isLoading, isError, isSuccess, data, error, isFetching } =
    useGetMyBlogsQuery(
      { limit: limit, offset: offset },
      { refetchOnMountOrArgChange: true }
    );

  useEffect(() => {
    if (isSuccess && data) {
      console.log("data = ", data.count);
    }
  }, [isSuccess]);

  // pagination logic

  if (isSuccess && !isFetching && !isLoading && data && data.results) {
    const pageCountTemp = Math.ceil(data.count / limit);

    if (pageCount !== pageCountTemp) {
      setPageCount(pageCountTemp);
      setInitialPage(0);
      setOffset(0);
    }
  }

  const handlePageClick = (event) => {
    if (
      event.nextSelectedPage !== undefined &&
      event.nextSelectedPage !== null
    ) {
      const newOffset = (event.nextSelectedPage * limit) % data.count;
      console.log("event.nextSelectedPage = ", event.nextSelectedPage);
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setOffset(newOffset);
      setInitialPage(event.nextSelectedPage); // Update the initialPage state
    }
  };

  const handlePageJump = () => {
    if (parseInt(jumpToPage) && parseInt(jumpToPage) <= pageCount) {
      let targetPage = parseInt(jumpToPage);
      console.log("targetPage = ", targetPage);

      const newOffset = ((targetPage - 1) * limit) % data.count;
      setOffset(newOffset);
      setInitialPage(targetPage - 1);
      setJumpToPage("");
    } else if (parseInt(jumpToPage) > pageCount) {
      toast.error(`You only have ${pageCount} pages`);
    } else {
      toast.error("Provide a valid page number");
    }
  };

  //end of pagination logic

  return (
    <div className="relative">
      <div className="bg-square-2 bg-primary/10" />
      <div className="container">
        <div className="mb-[20px] lg:mb-[25px] xl:mb-[30px]">
          <div className="text-primary font-semibold text-[1.563rem] md:text-[1.75rem] lg:text-[1.938rem]  xl:text-[2.125rem] leading-[30px] sm:leading-[2.536rem] mb-[5px]">
            Posted by <span className="text-[#087ea4]">{name}</span>{" "}
            {isSuccess && data?.count ? (
              <span className="text-[#087ea4]">({data.count})</span>
            ) : (
              <></>
            )}
          </div>
          <div className="text-[#757575] font-normal text-base lg:text-xl leading-[21.48px] ">
            {"Don't Miss New Trend"}
          </div>
        </div>

        <ReuseableBlogsListWithPaginations
          blogs={data?.blogs ? data.blogs : []}
          pageCount={pageCount}
          initialPage={initialPage}
          handlePageClick={handlePageClick}
          jumpToPage={jumpToPage}
          setJumpToPage={setJumpToPage}
          handlePageJump={handlePageJump}
          isLoading={isLoading}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default MyBlogs;

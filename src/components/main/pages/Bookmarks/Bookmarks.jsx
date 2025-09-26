"use client";

import { useGetBookmarkedBlogsQuery } from "@/redux/features/blogs/blogsApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReuseableBlogsListWithPaginations from "../../reuseable/ReuseableBlogsListWithPaginations/ReuseableBlogsListWithPaginations";
import SectionTitle from "../../reuseable/Typography/SectionTitle";

const Bookmarks = () => {
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [initialPage, setInitialPage] = useState(0); // Initialize initialPage state
  const [pageCount, setPageCount] = useState(0);
  const [jumpToPage, setJumpToPage] = useState("");

  const { isLoading, isError, isSuccess, data, error, isFetching } =
    useGetBookmarkedBlogsQuery(
      { limit: limit, offset: offset },
      { refetchOnMountOrArgChange: true }
    );

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log("Inside Articles Components, data = ", data);
  //   }
  // }, [isSuccess, data]);

  // useEffect(() => {
  //   if (isError) {
  //     console.log("Inside Articles Components, error = ", error);
  //   }
  // }, [error, isError]);

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
    <div>
      <div className="container">
        <div className="mb-5">
          <SectionTitle>Bookmarked Blogs</SectionTitle>
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

export default Bookmarks;

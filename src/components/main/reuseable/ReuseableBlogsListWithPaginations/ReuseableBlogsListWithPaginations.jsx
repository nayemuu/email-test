"use client";

import ReactPaginate from "react-paginate";
import BlogCard from "../Cards/BlogCard/BlogCard";
import JumpToPageSection from "../JumpToPageSection/JumpToPageSection";
import BlogCardLoader from "../Cards/BlogCard/BlogCardLoader";

const ReuseableBlogsListWithPaginations = ({
  blogs,
  pageCount,
  initialPage,
  handlePageClick,
  jumpToPage,
  setJumpToPage,
  handlePageJump,
  isLoading,
  isFetching,
  limit,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        [...Array(limit)].map((_, i) => <BlogCardLoader key={i} />)
      ) : blogs?.length ? (
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
      ) : (
        <div>No Blogs found</div>
      )}

      {pageCount > 1 && (
        <div className="pt-[50px] flex justify-between items-center gap-6 flex-wrap">
          <div className="shrink-0">
            <ReactPaginate
              key={initialPage} // Force re-render on initialPage change
              breakLabel="..."
              nextLabel=""
              onClick={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pageCount} // total number of page
              initialPage={initialPage} // Pass the initialPage state
              previousLabel=""
              renderOnZeroPageCount={null}
              containerClassName="flex flex-wrap gap-x-[10px] justify-center"
              pageLinkClassName="unselected-page"
              activeLinkClassName="active-page"
              previousClassName="hide"
              nextClassName="hide"
            />
          </div>

          {pageCount > 2 && handlePageJump ? (
            <JumpToPageSection
              pageCount={pageCount}
              jumpToPage={jumpToPage}
              setJumpToPage={setJumpToPage}
              handlePageJump={handlePageJump}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default ReuseableBlogsListWithPaginations;

"use client";

import { Button } from "@/components/ui/button";

function JumpToPageSection({
  pageCount,
  jumpToPage,
  setJumpToPage,
  handlePageJump,
  isLoading,
  isFetching,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-[16px] leading-[18px] font-semibold text-primary">
        Jump to page
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePageJump();
        }}
      >
        <input
          type="text"
          value={jumpToPage}
          onChange={(e) => {
            if (parseInt(e.target.value) && e.target.value !== NaN) {
              setJumpToPage(parseInt(e.target.value));
            } else if (e.target.value === "") {
              setJumpToPage("");
            }
          }}
          placeholder="page no."
          className={`w-[80px] h-[34px] rounded-[3px] flex justify-center items-center border border-primary text-center px-1 ${
            jumpToPage > pageCount ? "text-red-400" : ""
          }`}
        />
      </form>

      <Button onClick={handlePageJump} disable={isLoading || isFetching}>
        Jump
      </Button>
    </div>
  );
}

export default JumpToPageSection;

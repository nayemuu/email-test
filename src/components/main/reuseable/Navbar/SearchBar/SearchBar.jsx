"use client";
import { debounceHandler } from "@/utils/debounceHandler";
import "./SearchBar.css";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchBlogsQuery } from "@/redux/features/blogs/blogsApi";
import LoaderInsideButton from "../../Loader/LoaderInsideButton";
import SearchedItem from "./SearchedItem";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null); // Create a ref for the input field
  let limit = 5;

  const { isLoading, isError, isSuccess, isFetching, data, error, refetch } =
    useSearchBlogsQuery(
      { keyword: searchText.trim(), limit: limit, offset: 0 },
      {
        skip: !searchText.trim().length,
        refetchOnMountOrArgChange: 0,
      }
    );

  const doSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = debounceHandler(doSearch, 300);

  const clearInputField = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field text
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Inside SearchBar Components, data = ", data);
    }
  }, [isSuccess, data]);

  // useEffect(() => {
  //   if (isError) {
  //     console.log("Inside Articles Components, error = ", error);
  //   }
  // }, [error, isError]);

  const clearSearchResults = () => {
    setSearchText("");
    clearInputField();
  };

  return (
    <>
      <div
        className={`h-[40px] w-full relative ${
          searchText.length ? "z-[101]" : "z-10"
        }`}
      >
        <div className="absolute top-0 left-[15px] h-full flex items-center">
          <Icon icon="icon-park-outline:search" width="18" height="18" />
        </div>
        <form
          className="h-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="text"
            placeholder="Search Here..."
            onChange={handleSearch}
            className="bg-[#F5F5F5] w-full h-full outline-none rounded-[20px] border border-solid border-transparent pl-[42px] text-[14px]"
            ref={inputRef}
            //   onKeyDown={(e) => searchInputSuggestionHandler(e)}
          />

          {/* <input
          type="text"
          placeholder="Search Here..."
          onChange={handleSearch}
          className="bg-[#F5F5F5] w-full h-full outline-none rounded-[20px] border border-solid focus:border-primary border-transparent pl-[42px] text-[14px] searchbar"
          ref={inputRef}
          //   onKeyDown={(e) => searchInputSuggestionHandler(e)}
        /> */}
        </form>

        {searchText.length ? (
          <div className="absolute top-0 right-[15px] h-full flex items-center">
            <Icon
              icon="akar-icons:cross"
              className="text-[16px] hover:text-red-500 cursor-pointer"
              onClick={() => {
                setSearchText("");
                clearInputField();
              }}
            />
          </div>
        ) : (
          <></>
        )}

        {searchText.length ? (
          <div className="absolute top-[50px] bg-gray-100 w-full rounded-[10px]">
            <div
              className={`grid gap-y-1 mb-[1px] overflow-y-auto ${
                isLoading || data?.count === 0 ? "" : "max-h-[250px]"
              }`}
              style={{ overflowX: "hidden", position: "relative" }}
            >
              {isLoading ? (
                <div className="flex justify-center py-3">
                  <LoaderInsideButton className="text-primary" />
                </div>
              ) : (
                <></>
              )}

              {!isLoading && data?.count === 0 ? (
                <div className="flex justify-center items-center text-xs sm:text-sm py-3">
                  No blogs found!
                </div>
              ) : (
                <></>
              )}

              {!isLoading && data?.count > 0 ? (
                <div className="flex flex-col gap-1 p-2">
                  {data?.blogs.map((blog) => (
                    <SearchedItem
                      key={blog.id}
                      blog={blog}
                      clearSearchResults={clearSearchResults}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`${
          searchText.length
            ? "custom-backdrop-active"
            : "custom-backdrop-inactive"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setSearchText("");
          clearInputField();
        }}
      ></div>
    </>
  );
};

export default SearchBar;

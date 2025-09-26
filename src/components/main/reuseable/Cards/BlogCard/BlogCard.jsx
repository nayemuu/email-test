import Image from "next/image";
import "./BlogCard.css";
import moment from "moment";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import LikeFilledSvg from "../../svg/LikeFilledSvg";
import {
  useBookmarkTogglerMutation,
  useDeleteBlogMutation,
} from "@/redux/features/blogs/blogsApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const saveSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 5.25C8.80109 5.25 8.61032 5.32902 8.46967 5.46967C8.32902 5.61032 8.25 5.80109 8.25 6C8.25 6.19891 8.32902 6.38968 8.46967 6.53033C8.61032 6.67098 8.80109 6.75 9 6.75H15C15.1989 6.75 15.3897 6.67098 15.5303 6.53033C15.671 6.38968 15.75 6.19891 15.75 6C15.75 5.80109 15.671 5.61032 15.5303 5.46967C15.3897 5.32902 15.1989 5.25 15 5.25H9Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.943 1.25C9.87 1.25 8.237 1.25 6.961 1.423C5.651 1.601 4.606 1.975 3.785 2.805C2.965 3.634 2.597 4.687 2.421 6.007C2.25 7.296 2.25 8.945 2.25 11.041V16.139C2.25 17.647 2.25 18.84 2.346 19.739C2.441 20.627 2.644 21.428 3.226 21.964C3.692 22.394 4.282 22.664 4.912 22.737C5.699 22.827 6.434 22.451 7.159 21.937C7.892 21.419 8.781 20.632 9.903 19.64L9.939 19.608C10.459 19.148 10.811 18.838 11.105 18.622C11.389 18.415 11.562 18.34 11.708 18.31C11.9008 18.272 12.0992 18.272 12.292 18.31C12.438 18.34 12.612 18.415 12.895 18.622C13.189 18.837 13.541 19.148 14.061 19.608L14.098 19.64C15.219 20.632 16.108 21.419 16.841 21.938C17.566 22.451 18.301 22.827 19.088 22.737C19.7177 22.6646 20.3081 22.3939 20.774 21.964C21.355 21.428 21.559 20.627 21.654 19.739C21.75 18.84 21.75 17.647 21.75 16.139V11.041C21.75 8.945 21.75 7.295 21.579 6.007C21.403 4.687 21.035 3.634 20.215 2.805C19.394 1.975 18.349 1.601 17.039 1.423C15.763 1.25 14.13 1.25 12.057 1.25H11.943ZM4.85 3.86C5.347 3.358 6.022 3.065 7.162 2.91C8.325 2.752 9.856 2.75 11.999 2.75C14.142 2.75 15.673 2.752 16.836 2.91C17.976 3.065 18.651 3.358 19.148 3.86C19.646 4.363 19.937 5.048 20.091 6.205C20.247 7.383 20.249 8.932 20.249 11.098V16.091C20.249 17.657 20.248 18.771 20.162 19.579C20.072 20.409 19.909 20.72 19.757 20.861C19.523 21.076 19.229 21.211 18.917 21.246C18.717 21.269 18.383 21.192 17.707 20.714C17.049 20.247 16.22 19.516 15.054 18.484L15.028 18.461C14.54 18.03 14.136 17.673 13.779 17.411C13.406 17.139 13.03 16.929 12.587 16.84C12.1989 16.7619 11.7991 16.7619 11.411 16.84C10.968 16.93 10.591 17.139 10.219 17.412C9.862 17.672 9.458 18.03 8.97 18.461L8.944 18.484C7.778 19.516 6.949 20.247 6.291 20.714C5.615 21.192 5.281 21.269 5.081 21.246C4.76726 21.21 4.47309 21.0752 4.241 20.861C4.089 20.72 3.925 20.409 3.837 19.579C3.75 18.77 3.749 17.657 3.749 16.091V11.097C3.749 8.932 3.751 7.383 3.907 6.205C4.061 5.048 4.352 4.363 4.85 3.86Z"
      fill="currentColor"
    />
  </svg>
);
const savedSvg = (
  <svg
    width={24}
    height={24}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M157.5 83.235V120.682C157.5 143.902 157.5 155.52 151.995 160.59C149.37 163.013 146.055 164.535 142.522 164.94C135.12 165.788 126.472 158.137 109.185 142.845C101.535 136.087 97.7175 132.705 93.3 131.82C91.1219 131.381 88.8781 131.381 86.7 131.82C82.275 132.705 78.4575 136.087 70.815 142.845C53.5275 158.137 44.88 165.787 37.4775 164.932C33.9393 164.527 30.6218 163.006 28.005 160.59C22.5 155.52 22.5 143.91 22.5 120.682V83.2275C22.5 51.075 22.5 34.9875 32.385 24.9975C42.27 15 58.185 15 90 15C121.823 15 137.73 15 147.615 24.99C157.5 34.9875 157.5 51.075 157.5 83.235ZM61.875 45C61.875 43.5082 62.4676 42.0774 63.5225 41.0225C64.5774 39.9676 66.0082 39.375 67.5 39.375H112.5C113.992 39.375 115.423 39.9676 116.477 41.0225C117.532 42.0774 118.125 43.5082 118.125 45C118.125 46.4918 117.532 47.9226 116.477 48.9775C115.423 50.0324 113.992 50.625 112.5 50.625H67.5C66.0082 50.625 64.5774 50.0324 63.5225 48.9775C62.4676 47.9226 61.875 46.4918 61.875 45Z"
      fill="currentColor"
    />
  </svg>
);

const likeSvg = (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.70276 6.6176C2.91066 6.6176 3.08392 6.78556 3.08392 6.98711V12.0707C3.08392 12.2722 2.91066 12.4402 2.70276 12.4402H0.958671C0.750767 12.4402 0.577513 12.2722 0.577513 12.0707V6.98711C0.577513 6.78556 0.750767 6.6176 0.958671 6.6176H2.70276ZM2.70276 6.05774H0.958671C0.427359 6.05774 0 6.47204 0 6.98711V12.0707C0 12.5857 0.427359 13 0.958671 13H2.70276C3.23407 13 3.66143 12.5857 3.66143 12.0707V6.98711C3.67298 6.47204 3.23407 6.05774 2.70276 6.05774Z"
      fill="#757575"
    />
    <path
      d="M8.0043 0V0.559862C8.39701 0.559862 8.72042 0.862188 8.72042 1.2317V1.53402C8.72042 1.86994 8.67422 2.19466 8.57026 2.51938L7.92345 4.69164C7.87725 4.8596 7.9119 5.03876 8.01585 5.18432C8.1198 5.32989 8.29306 5.40827 8.47786 5.40827H11.9198C12.1393 5.40827 12.3356 5.53144 12.3934 5.72179C12.4511 5.88975 12.4049 6.01292 12.3587 6.0913C12.2894 6.20327 12.1739 6.29285 12.0469 6.31524C11.7812 6.38243 11.608 6.61757 11.608 6.87511C11.6195 7.13264 11.8159 7.35659 12.0815 7.40138C12.2548 7.43497 12.4396 7.59173 12.4165 7.81568C12.3934 8.00603 12.197 8.15159 11.9314 8.15159C11.6311 8.15159 11.377 8.38673 11.3539 8.67786C11.3308 8.96899 11.5502 9.22653 11.8621 9.27132C12.0469 9.29371 12.1739 9.43928 12.1739 9.60723C12.1739 9.78639 12.0353 9.92076 11.839 9.94315C11.5733 9.96555 11.3539 10.1783 11.3192 10.4358C11.2846 10.7046 11.4578 10.9509 11.7235 11.0293C11.8043 11.0517 11.8736 11.1189 11.8736 11.2196V11.3092C11.8736 11.4212 11.7697 11.5108 11.6426 11.5108L5.08209 11.5332C5.04744 11.5332 5.02434 11.5108 5.02434 11.4884V6.28165C5.02434 5.93454 5.13984 5.59862 5.35929 5.32989L7.32284 2.91128C7.63469 2.50818 7.8195 2.0155 7.8195 1.51163V0.727821C7.8195 0.638243 7.90035 0.559862 7.9812 0.559862L8.0043 0ZM8.0043 0C7.99275 0 7.9812 0 7.96965 0C7.56539 0.0111972 7.24199 0.335917 7.24199 0.727821V1.51163C7.24199 1.89233 7.11493 2.26184 6.87238 2.56417L4.90883 4.98277C4.60853 5.35228 4.44682 5.81137 4.44682 6.28165V11.4884C4.44682 11.8243 4.73558 12.093 5.08209 12.093L11.6542 12.0818C12.0931 12.0818 12.4511 11.7347 12.4511 11.3204V11.2308C12.4511 10.8949 12.2201 10.6038 11.8967 10.503C12.3703 10.4582 12.7515 10.0775 12.7515 9.60723C12.7515 9.14815 12.3934 8.77864 11.9314 8.72265H11.9776C12.4858 8.72265 12.9478 8.36434 12.994 7.88286C13.0402 7.37898 12.6822 6.95349 12.197 6.86391C12.763 6.71835 13.1442 6.15848 12.9478 5.55383C12.8092 5.12834 12.3934 4.84841 11.9198 4.84841H11.8967H8.47786L9.13623 2.67614C9.25173 2.30663 9.30948 1.92593 9.30948 1.53402V1.2317C9.30948 0.548665 8.72042 0 8.0043 0Z"
      fill="#757575"
    />
  </svg>
);

const TagHandler = (tags) => {
  if (tags?.length > 0) {
    return tags.map((tag, index) => {
      if (index < 2) {
        return (
          <div
            key={tag.id}
            className="py-[5px] px-[8px] text-brand-primary bg-brand-primary-soft font-medium text-[12px] leading-[14px] rounded-[4px]"
          >
            {tag.title}
          </div>
        );
      }
      if (index === 2) {
        return (
          <div
            key={index}
            className="py-[5px] px-[8px] text-primary font-medium text-[0.688rem] sm:text-xs leading-[10px]  sm:leading-[14.32px] rounded bg-primary15"
          >
            ...
          </div>
        );
      }
    });
  }
};

const BlogCard = ({ blog }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.profile);
  // console.log("id = ", id);

  const [deleteBlog, { isLoading, isError, isSuccess, data, error }] =
    useDeleteBlogMutation();

  const [
    bookmarkToggler,
    {
      isLoading: bookmarkIsLoading,
      isError: bookmarkIsError,
      isSuccess: bookmarkIsSuccess,
      data: bookmarkData,
      error: bookmarkError,
    },
  ] = useBookmarkTogglerMutation();

  useEffect(() => {
    if (blog?.isBookmarked) {
      setIsBookmark(blog.isBookmarked);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      // console.log("error = ", error);
      if (error?.data?.message) {
        toast.error(error.data.message);
        // toast.success(error.data.message);
      } else {
        toast.error("Somethimg went wrong");
      }
    }
  }, [isError]);

  useEffect(() => {
    if (bookmarkIsSuccess && bookmarkData) {
      if (bookmarkData?.data) {
        // console.log("isBookmarked = ", bookmarkData.data.isBookmarked);
        setIsBookmark(bookmarkData.data.isBookmarked);
      }
    }
  }, [bookmarkIsSuccess]);

  const handleBookmark = () => {
    if (accessToken) {
      if (!isLoading) {
        bookmarkToggler(blog.id);
      }
    } else {
      toast.error("Please log in to add this bookmark.");
    }
  };

  return (
    <div className="blog-card-shadow border-2 border-transparent hover:border-brand-primary rounded-[15px] overflow-hidden">
      <div className="bg-[#FFFFFF] rounded-[12px] flex overflow-hidden h-[171px]">
        <div className="relative h-full aspect-[16/10] rounded-[12px] overflow-hidden shrink-0">
          <Image
            src={blog.thumbnail}
            fill
            className="w-full h-full object-cover"
            alt={blog.title}
          />
        </div>

        <div className="w-full p-4 flex flex-col gap-2 justify-center">
          <div className="flex justify-between w-full">
            {/* Tag list */}
            <div className="flex gap-1">{TagHandler(blog.tags)}</div>

            <div className="flex gap-2 items-center">
              {id === blog?.author?.id ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="text-[#757575] hover:text-white bg-brand-primary-soft hover:bg-primary aspect-square flex justify-center items-center rounded-full p-1.5 cursor-pointer">
                      <Icon icon="charm:menu-kebab" width="15" height="15" />
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <Link href={`/update-blog/${blog.id}`}>
                      <DropdownMenuItem className="text-[14px] leading-[16px] cursor-pointer">
                        <Icon icon="bytesize:edit" width="15" height="15" />
                        Edit
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem
                      className="text-[14px] leading-[16px] cursor-pointer"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      <Icon
                        icon="fluent:delete-24-regular"
                        width="15"
                        height="15"
                      />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : isBookmark ? (
                <Tooltip>
                  <TooltipTrigger>
                    <span
                      className={cn(
                        `cursor-pointer hover:text-[#757575] text-brand-primary ${
                          bookmarkIsLoading ? "cursor-progress" : ""
                        }`
                      )}
                      onClick={handleBookmark}
                    >
                      {savedSvg}
                    </span>{" "}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove from Bookmark</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger>
                    <span
                      className={cn(
                        `cursor-pointer text-[#757575] hover:text-brand-primary ${
                          bookmarkIsLoading ? "cursor-progress" : ""
                        }`
                      )}
                      onClick={handleBookmark}
                    >
                      {saveSvg}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to Bookmark</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <div
            className={`text-[16px] font-medium leading-[18px] line-clamp-2 pb-1`}
          >
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </div>

          <div className="flex justify-between w-full items-end">
            <div className="flex items-center gap-2">
              <div>
                <div className="h-[35px] aspect-square border border-solid border-stock hover:border-primary rounded-full flex justify-center items-center cursor-pointer bg-brand-primary text-[22px] leading-0 text-white font-bold">
                  {blog.author.name[0]?.toUpperCase()}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-[14px] leading-[16px] font-[400] text-brand-primary">
                  {blog.author.name}
                </div>
                <div className="flex gap-1 items-center">
                  {blog?.isLiked ? (
                    <span className="text-primary">
                      <LikeFilledSvg width={13} height={13} />
                    </span>
                  ) : (
                    likeSvg
                  )}

                  <span className="text-[12px] font-light text-[#757575] leading-[13px]">
                    ({blog.likesCount})
                  </span>
                </div>
              </div>
            </div>
            <div className="text-[12px] font-light text-[#757575] leading-[13px]">
              {moment(blog.createdAt).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

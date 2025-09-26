"use client";

import React from "react";
import parse from "html-react-parser";
import "react-quill-new/dist/quill.snow.css";
import moment from "moment";
import { Icon } from "@iconify/react";
import "./Blog.css";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useLikeUnlikeTogglerMutation } from "@/redux/features/blogs/blogsApi";
import LoaderInsideButton from "../../reuseable/Loader/LoaderInsideButton";

let bigLikedSvg = (
  <svg
    width={21}
    height={21}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1449_920)">
      <path
        d="M4.17825 21H1.74741C0.78051 21 0 20.2578 0 19.3383V11.4435C0 10.524 0.78051 9.78178 1.74741 9.78178H4.17825C5.14515 9.78178 5.92567 10.524 5.92567 11.4435V19.3383C5.92567 20.2578 5.14515 21 4.17825 21Z"
        fill="url(#paint0_linear_1449_920)"
      />
      <path
        d="M20.9923 12.7248C21.0738 11.9161 20.4875 11.2219 19.6992 11.0816C20.6078 10.8563 21.233 9.95163 20.9185 8.96939C20.701 8.28256 20.0137 7.82837 19.2604 7.82837H19.2254H13.7036L14.7598 4.31667C14.9385 3.71847 15.0317 3.09811 15.0317 2.47405V1.99032C15.0317 0.871448 14.0609 -0.0332467 12.8726 -1.30232e-05C12.2125 0.0184501 11.696 0.550189 11.696 1.17794V2.43712C11.696 3.05379 11.4864 3.652 11.0942 4.14681L7.93328 8.05731C7.44789 8.65921 7.18384 9.39404 7.18384 10.1547V18.5665C7.18384 19.1057 7.64205 19.5414 8.20899 19.5414L18.8177 19.5266C19.5322 19.5266 20.1147 18.9764 20.1147 18.2933V18.1456C20.1147 17.5991 19.738 17.1338 19.2177 16.975C19.9904 16.9049 20.5962 16.2882 20.5962 15.5312C20.5962 14.7927 20.0176 14.1871 19.2682 14.0948H19.3458C20.1807 14.0911 20.9146 13.5113 20.9923 12.7248Z"
        fill="url(#paint1_linear_1449_920)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1449_920"
        x1={2.96283}
        y1={9.78178}
        x2={2.96283}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1449_920"
        x1={14.0923}
        y1={-0.000900269}
        x2={14.0923}
        y2={19.5414}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <clipPath id="clip0_1449_920">
        <rect width={21} height={21} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

let likeSvg = (
  <div>
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.53438 8.65375C3.80625 8.65375 4.03282 8.87339 4.03282 9.13695V15.7847C4.03282 16.0482 3.80625 16.2679 3.53438 16.2679H1.25365C0.981772 16.2679 0.755209 16.0482 0.755209 15.7847V9.13695C0.755209 8.87339 0.981772 8.65375 1.25365 8.65375H3.53438ZM3.53438 7.92162H1.25365C0.558855 7.92162 0 8.4634 0 9.13695V15.7847C0 16.4582 0.558855 17 1.25365 17H3.53438C4.22917 17 4.78802 16.4582 4.78802 15.7847V9.13695C4.80313 8.4634 4.22917 7.92162 3.53438 7.92162Z"
        fill="#757575"
      />
      <path
        d="M10.4673 0V0.732127C10.9808 0.732127 11.4037 1.12748 11.4037 1.61068V2.00603C11.4037 2.44531 11.3433 2.86994 11.2074 3.29457L10.3615 6.13523C10.3011 6.35487 10.3464 6.58915 10.4824 6.7795C10.6183 6.96985 10.8449 7.07235 11.0865 7.07235H15.5876C15.8746 7.07235 16.1313 7.23342 16.2069 7.48234C16.2824 7.70198 16.222 7.86305 16.1615 7.96555C16.0709 8.11197 15.9199 8.22911 15.7537 8.2584C15.4063 8.34625 15.1798 8.65375 15.1798 8.99052C15.1949 9.3273 15.4517 9.62015 15.799 9.67872C16.0256 9.72265 16.2673 9.92765 16.2371 10.2205C16.2069 10.4694 15.9501 10.6598 15.6027 10.6598C15.21 10.6598 14.8777 10.9673 14.8475 11.348C14.8173 11.7287 15.1043 12.0655 15.5121 12.124C15.7537 12.1533 15.9199 12.3437 15.9199 12.5633C15.9199 12.7976 15.7386 12.9733 15.4819 13.0026C15.1345 13.0319 14.8475 13.3101 14.8022 13.6469C14.7569 13.9983 14.9834 14.3204 15.3308 14.4229C15.4365 14.4522 15.5272 14.5401 15.5272 14.6718V14.789C15.5272 14.9354 15.3912 15.0525 15.2251 15.0525L6.64592 15.0818C6.6006 15.0818 6.57039 15.0525 6.57039 15.0233V8.21447C6.57039 7.76055 6.72144 7.32127 7.00842 6.96985L9.57613 3.80706C9.98394 3.27993 10.2256 2.63566 10.2256 1.97674V0.951766C10.2256 0.834625 10.3313 0.732127 10.4371 0.732127L10.4673 0ZM10.4673 0C10.4522 0 10.4371 0 10.422 0C9.89331 0.0146425 9.4704 0.439276 9.4704 0.951766V1.97674C9.4704 2.47459 9.30425 2.95779 8.98706 3.35314L6.41935 6.51593C6.02664 6.99914 5.81519 7.59948 5.81519 8.21447V15.0233C5.81519 15.4625 6.19279 15.814 6.64592 15.814L15.2402 15.7993C15.8142 15.7993 16.2824 15.3454 16.2824 14.8036V14.6865C16.2824 14.2472 15.9803 13.8665 15.5574 13.7347C16.1767 13.6761 16.6751 13.1783 16.6751 12.5633C16.6751 11.963 16.2069 11.4798 15.6027 11.4065H15.6631C16.3277 11.4065 16.9319 10.938 16.9923 10.3084C17.0527 9.64944 16.5845 9.09302 15.9501 8.97588C16.6902 8.78553 17.1886 8.0534 16.9319 7.2627C16.7506 6.70629 16.2069 6.34022 15.5876 6.34022H15.5574H11.0865L11.9475 3.49957C12.0985 3.01636 12.174 2.51852 12.174 2.00603V1.61068C12.174 0.717485 11.4037 0 10.4673 0Z"
        fill="#757575"
      />
    </svg>
  </div>
);

const Blog = ({ blog }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [likeUnlikeToggler, { isLoading, isError, isSuccess, data, error }] =
    useLikeUnlikeTogglerMutation();

  const handleLikeUnlikeToggle = () => {
    if (accessToken) {
      likeUnlikeToggler(blog.id);
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <div className="relative">
      <div className="bg-square bg-primary/10" />
      {/* <div className="absolute bg-brand-primary-soft max-h-[500px] h-full top-0 left-0 right-0 z[-1] pointer-none"></div> */}
      <div className="container">
        <div className="flex flex-col gap-3">
          <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-[2.188rem] font-semibold  md:leading-[21.48px] lg:leading-[32px] xl:leading-[38px] xxl:leading-[41.77px]">
            {blog.title}
          </div>

          {/* Author Section */}

          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-[40px] aspect-square border border-solid border-stock hover:border-primary rounded-full flex justify-center items-center cursor-pointer bg-brand-primary text-[22px] leading-0 text-white font-bold">
                  {blog.author.name[0]?.toUpperCase()}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-base md:text-xl font-medium text-brand-primary md:leading-[21.48px]">
                    {blog.author.name}
                  </div>
                  <div className="flex items-center gap-1">
                    {likeSvg}

                    <span className="text-[14px] font-light text-[#757575] leading-[16px]">
                      ({blog.likesCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 text-[#757575] text-[14px] leading-[16px]">
                <div className="text-[#637381] font-medium">Published At:</div>{" "}
                {moment(blog.publishedAt).fromNow()}
              </div>
            </div>

            {blog.isLiked ? (
              <button
                onClick={handleLikeUnlikeToggle}
                disabled={isLoading}
                className="flex gap-2 justify-center items-center h-[45px] w-[145px] bg-primary border border-primary hover:bg-primary/80 text-[18px] leading-[20px] text-white font-bold rounded-[5px] cursor-pointer"
              >
                {isLoading ? <LoaderInsideButton /> : <></>} {bigLikedSvg}
                Liked
              </button>
            ) : (
              <button
                onClick={handleLikeUnlikeToggle}
                disabled={isLoading}
                className="flex gap-2 justify-center items-center h-[45px] w-[145px] border border-primary text-[18px] leading-[20px] text-primary font-bold rounded-[5px] cursor-pointer"
              >
                {isLoading ? (
                  <LoaderInsideButton className="text-primary" />
                ) : (
                  <></>
                )}
                {bigLikedSvg}
                Like
              </button>
            )}
          </div>

          {/* thumbnail Section */}
          <div>
            <img
              className="mx-auto w-full md:w-8/12 object-contain h-80 md:h-96"
              src={blog.thumbnail}
              alt={blog.title}
            />
          </div>

          {blog.tags.length ? (
            <div className="flex justify-center gap-2">
              {blog.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="py-[6px] px-[10px] bg-brand-primary text-white font-medium text-[14px] leading-[16px] rounded-[4px]"
                >
                  {tag.title}
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}

          {/* content Section */}
          <div className="ql-snow">
            <div className="ql-editor">{parse(blog.content)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

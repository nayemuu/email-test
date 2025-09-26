"use client";

import { useProfileQuery } from "@/redux/features/profile/profileApi";
import { useEffect } from "react";
import backgroundOfCoverPhoto from "@/assets/pages/profile/backgroundOfCoverPhoto.png";
import Image from "next/image";
import "./ProfileSection.css";

function ProfileSection(props) {
  const { isLoading, isError, isSuccess, data, error } = useProfileQuery();

  // useEffect(() => {
  //   if (isSuccess) {
  //     if (data?.data) {
  //       console.log("data = ", data.data);
  //       console.log("totalBlogs = ", data.data.user.totalBlogs);
  //     }
  //   }
  // }, [isSuccess]);

  return isSuccess ? (
    <div className="container">
      <div className="sm:grid grid-cols-2 py-[50px]">
        <div className="flex flex-col justify-center gap-y-[9px] md:gap-y-[15px] lg:gap-y-[20px]">
          <div>
            {data?.data?.user?.name ? (
              <div className="text-[2rem] sm:text-[2.25rem] md:text-[2.625rem] lg:text-5xl xxl:text-6xl font-semibold text-primary leading-[30.6px] md:leading-[40.6px]  lg:leading-[50.6px] xl:leading-[65.6px] xxl:leading-[71.6px]">
                {data.data.user.name}
              </div>
            ) : (
              <></>
            )}

            <div className="text-[#757575] text-lg sm:text-xl md:text-2xl lg:text-2xl font-normal leading-[20.8px] sm:leading-[35.8px] mt-[6px] xxl:mt-[10px]">
              Total Articles:{" "}
              <span className="text-primary">
                {data?.data?.user?.totalBlogs ? data.data.user.totalBlogs : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="relative cover-photo-background">
          <div className="bg-primary rounded-full aspect-square h-[260px] z-[2]">
            {data?.data?.user?.name ? (
              <div className="w-full h-full flex text-white lg:text-[150px] justify-center items-center p-1">
                {data.data.user.name[0]?.toUpperCase()}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">Loading...</div>
  );
}

export default ProfileSection;

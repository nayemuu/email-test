"use client";

import React, { useState } from "react";

const closeSvg = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" rx="3" fill="#E40000" />
    <path
      d="M11.6464 3.64645C11.8417 3.45118 12.1582 3.45118 12.3535 3.64645C12.5487 3.84171 12.5487 4.15822 12.3535 4.35348L8.70699 7.99996L12.3535 11.6464L12.3877 11.6845C12.5478 11.8809 12.5365 12.1704 12.3535 12.3535C12.1704 12.5365 11.8809 12.5478 11.6845 12.3877L11.6464 12.3535L7.99996 8.70699L4.35348 12.3535C4.15822 12.5487 3.84171 12.5487 3.64645 12.3535C3.45118 12.1582 3.45118 11.8417 3.64645 11.6464L7.29293 7.99996L3.64645 4.35348C3.45118 4.15822 3.45118 3.84171 3.64645 3.64645C3.84171 3.45118 4.15822 3.45118 4.35348 3.64645L7.99996 7.29293L11.6464 3.64645Z"
      fill="white"
    />
  </svg>
);

const ImageUpload = ({ image, setImage, title }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const imageFieldHandler = (e) => {
    setImageLoading(true);
    setImage(e.target.files[0]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    const files = Array.from(e.dataTransfer.files).filter(
      (file) =>
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
    );
    if (files.length) {
      setImage(files[0]);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <div className="text-[16px] leading-[18px] font-semibold mb-[8px]">
        {title}:
      </div>

      <div className="flex gap-x-2.5 h-[250px]">
        <div className="h-full w-full">
          <label onDrop={onDrop} onDragOver={onDragOver}>
            <div
              className={`h-full bg-transparent flex justify-center items-center w-full rounded-lg cursor-pointer border-dashed border border-[#DCE0E4]`}
            >
              <div className="py-[16px] px-3 flex flex-col justify-center items-center gap-y-[6px]">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.77116 20.8333C5.18783 20.8333 3.83713 20.2882 2.71908 19.1979C1.60102 18.1007 1.04199 16.7639 1.04199 15.1875C1.04199 13.8333 1.44824 12.625 2.26074 11.5625C3.08019 10.5 4.14963 9.82291 5.46908 9.53125C5.90658 7.93403 6.77463 6.64236 8.07324 5.65625C9.3788 4.66319 10.8545 4.16666 12.5003 4.16666C14.535 4.16666 16.2573 4.875 17.667 6.29166C19.0837 7.70139 19.792 9.42361 19.792 11.4583C20.9934 11.5972 21.9864 12.1181 22.7712 13.0208C23.5628 13.9097 23.9587 14.9514 23.9587 16.1458C23.9587 17.4514 23.5038 18.559 22.5941 19.4687C21.6844 20.3785 20.5767 20.8333 19.2712 20.8333H13.542C12.9725 20.8333 12.483 20.6285 12.0732 20.2187C11.6635 19.816 11.4587 19.3264 11.4587 18.75V13.3854L9.79199 15L8.33366 13.5417L12.5003 9.375L16.667 13.5417L15.2087 15L13.542 13.3854V18.75H19.2712C20.0003 18.75 20.6149 18.4965 21.1149 17.9896C21.6219 17.4896 21.8753 16.875 21.8753 16.1458C21.8753 15.4167 21.6219 14.8021 21.1149 14.3021C20.6149 13.7951 20.0003 13.5417 19.2712 13.5417H17.7087V11.4583C17.7087 10.0208 17.2017 8.79166 16.1878 7.77083C15.1739 6.75694 13.9448 6.25 12.5003 6.25C11.0628 6.25 9.83366 6.75694 8.81283 7.77083C7.79894 8.79166 7.29199 10.0208 7.29199 11.4583H6.77116C5.76421 11.4583 4.90658 11.816 4.19824 12.5312C3.48296 13.2396 3.12533 14.0972 3.12533 15.1042C3.12533 16.1111 3.48296 16.9792 4.19824 17.7083C4.90658 18.4028 5.76421 18.75 6.77116 18.75H9.37533V20.8333"
                    fill="#43bfc7"
                  />
                </svg>
                <div className="text-[14px] leading-[16px] text-primary font-semibold">
                  Upload Image
                </div>

                {image != null && typeof image !== "string" ? (
                  <span style={{ fontSize: "14px" }}>
                    <b>Chosen file:</b>{" "}
                    {image.name.length > 20
                      ? `${image.name.substring(0, 10)}...`
                      : image.name}
                  </span>
                ) : (
                  <span style={{ fontSize: "14px" }}>
                    <b>Chosen file:</b> No Image chosen yet
                  </span>
                )}
              </div>
            </div>

            <input
              type="file"
              className="hidden"
              accept=".jpg, .png, .webp, .jpeg"
              onChange={imageFieldHandler}
              multiple
            />
          </label>
        </div>

        {image && image instanceof File && URL.createObjectURL(image) ? (
          <div className="h-full aspect-square bg-white rounded-lg border border-[#DCE0E4] relative flex justify-center items-center overflow-hidden shrink-0">
            <span
              className="absolute top-2 right-2 cursor-pointer z-2"
              onClick={() => setImage(null)}
            >
              {closeSvg}
            </span>

            <img
              src={URL.createObjectURL(image)}
              className="object-cover h-full w-auto"
              alt="icon"
              onLoad={() => {
                setImageLoading(false);
              }}
            />

            {imageLoading && (
              <div className="h-full w-full rounded bg-gray-400 animate-pulse"></div>
            )}
          </div>
        ) : image && typeof image === "string" ? (
          <div className="h-full aspect-square bg-white rounded-lg border border-[#DCE0E4] relative flex justify-center items-center overflow-hidden shrink-0">
            <span
              className="absolute top-2 right-2 cursor-pointer z-2"
              onClick={() => setImage(null)}
            >
              {closeSvg}
            </span>

            <img
              src={image}
              className="object-cover h-full w-auto"
              alt="icon"
              onLoad={() => {
                setImageLoading(false);
              }}
            />

            {imageLoading && (
              <div className="h-full w-full rounded bg-gray-400 animate-pulse"></div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

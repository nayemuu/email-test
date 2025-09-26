"use client";

import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

export default function EnsureReduxStoreSetup({ children }) {
  const store = useSelector((store) => store);
  //   console.log("store = ", store);

  if (!store) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-[200px]">
        <PulseLoader color="#43bfc7" />
      </div>
    ); // Showing loader while Ensuring redux store is set
  }

  return <>{children}</>;
}

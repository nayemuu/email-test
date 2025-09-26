"use client";

import { useEffect } from "react";

function OtpVerificationTimer({ minutes, setMinutes, seconds, setSeconds }) {
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          // You can add code here to handle when the countdown reaches 00:00.
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, [minutes, seconds]);

  // Format the minutes and seconds to have leading zeros
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div className="flex justify-center text-[#757575] font-normal">
      {`${formattedMinutes}:${formattedSeconds}`}
    </div>
  );
}

export default OtpVerificationTimer;

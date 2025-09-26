import React from "react";

const LikeFilledSvg = ({ width = 21, height = 21, color = "currentColor" }) => {
  return (
    <svg
      width={width}
      height={height}
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
          <stop stopColor={color} />
          <stop offset={1} stopColor={color} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1449_920"
          x1={14.0923}
          y1={-0.000900269}
          x2={14.0923}
          y2={19.5414}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset={1} stopColor={color} />
        </linearGradient>
        <clipPath id="clip0_1449_920">
          <rect width={21} height={21} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LikeFilledSvg;

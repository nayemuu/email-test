import React from "react";

const SectionTitle = ({ children }) => {
  return (
    <div className="text-primary font-semibold text-[1.313rem] md:text-2xl lg:text-3xl xl:text-[2.125rem] leading-[23px] md:leading-[26px] lg:leading-[32px] xl:leading-[40.57px]">
      {children}
    </div>
  );
};

export default SectionTitle;

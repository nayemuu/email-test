import MyBlogs from "@/components/main/pages/Profile/MyBlogs/MyBlogs";
import ProfileSection from "@/components/main/pages/Profile/ProfileSection/ProfileSection";
import ProtectedRoute from "@/components/main/reuseable/ProtectedRoute/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <ProfileSection />
        <MyBlogs />
      </div>
    </ProtectedRoute>
  );
};

export default page;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      toast.error("Please log in to access this page.");
      router.replace("/"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-[200px]">
        <PulseLoader color="#43bfc7" />
      </div>
    ); // Showing loader while checking auth
  }

  return <>{children}</>;
}

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const LogoutAlert = ({ setShowLogoutModal }) => {
  const { refreshToken } = useSelector((state) => state.auth);
  const [logout, { isLoading, isError, isSuccess, data, error }] =
    useLogoutMutation();

  const handleLogout = () => {
    // setShowLogoutModal(false);
    if (refreshToken) {
      logout(refreshToken);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowLogoutModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("error = ", error);
      toast.error("Something went wrong");
    }
  }, [isError]);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You want to logout from Blogify!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button onClick={handleLogout} disabled={isLoading}>
          Continue
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default LogoutAlert;

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useEffect, useState } from "react";
import Error from "../../Error/Error";
import { Icon } from "@iconify/react";
import LoaderInsideButton from "../../Loader/LoaderInsideButton";
import { toast } from "sonner";

const LoginModal = ({ open, setShowRegisterModal, setShowLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("email = ", email);
    // console.log("password = ", password);

    login({ email: email.trim(), password: password.trim() });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowLoginModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      // console.log("error = ", error);
      if (error?.data?.message) {
        toast.error(error.data.message);
        // toast.success(error.data.message);
      } else {
        toast.error("Somethimg went wrong");
      }
    }
  }, [isError]);

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader> */}

          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle className="modal-title">Login</DialogTitle>

            <div className="modal-slogan">
              Please enter your username/password to
              <span className="text-brand-primary"> sign in</span>.
            </div>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <div className="relative flex w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="pr-[40px]"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="absolute top-0 right-[8px] h-full flex items-center">
                  {showPassword ? (
                    <Icon
                      icon="clarity:eye-line"
                      className="text-[22px] hover:text-brand-primary cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Icon
                      icon="clarity:eye-hide-line"
                      className="text-[22px] hover:text-brand-primary cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoaderInsideButton /> : <></>}
              Login
            </Button>

            {/* {isError ? (
              <Error
                message={
                  error?.data?.message
                    ? error.data.message
                    : "Something went wrong"
                }
              />
            ) : (
              <></>
            )} */}

            <div className="text-center text-[14px] leading-[16px]">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setShowRegisterModal(true);
                  setShowLoginModal(false);
                }}
                className="text-brand-primary cursor-pointer"
              >
                Sign Up
              </span>
            </div>
          </div>
          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>
          </DialogFooter> */}
        </form>
      </DialogContent>
    </>
  );
};

export default LoginModal;

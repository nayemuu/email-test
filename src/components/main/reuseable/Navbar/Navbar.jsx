"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assets/components/Navbar/care2shareLogo.png";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar/SearchBar";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Hamburger from "./Hamburger/Hamburger";
import MobileNav from "./MobileNav";
import LoginModal from "../Modals/LoginModal/LoginModal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@/components/ui/avatar";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { clearProfileInfo } from "@/redux/features/profile/profileSlice";
import LogoutAlert from "../AlertDialog/LogoutAlert/LogoutAlert";
import RegisterModal from "../Modals/LoginModal/RegisterModal";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "Create Blog",
    href: "/create-blog",
  },
];

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("accessToken = ", accessToken);
  // }, [accessToken]);

  // useEffect(() => {
  //   console.log("profile = ", profile);
  // }, [profile]);

  // useEffect(() => {
  //   console.log("showLoginModal = ", showLoginModal);
  // }, [showLoginModal]);

  return (
    <>
      <div className="bg-white backdrop-blur-md sticky top-0 left-0 right-0 border-b z-[10]">
        <div className="container min-h-[80px] flex items-center justify-between w-full gap-x-[20px]">
          <div className="flex gap-x-[15px] items-center">
            <Image src={logo} className="w-36" alt="logo" />

            {navLinks?.length ? (
              <nav className="hidden gap-6 lg:flex">
                {navLinks?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>

          <div className="w-full max-w-[410px] flex-grow flex items-center gap-x-[10px]">
            <SearchBar />

            {accessToken && name ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="h-[40px] aspect-square rounded-full">
                  <div className="h-[40px] aspect-square border border-solid border-stock hover:border-primary rounded-full flex justify-center items-center cursor-pointer bg-brand-primary text-[22px] leading-0 text-white font-bold">
                    {name[0]?.toUpperCase()}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/bookmarks">
                    <DropdownMenuItem className="cursor-pointer">
                      Bookmarks
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="h-[40px] aspect-square rounded-full">
                  <div className="h-[40px] aspect-square border border-solid border-stock hover:border-primary rounded-full flex justify-center items-center cursor-pointer bg-brand-primary">
                    <Icon
                      icon="ep:user-filled"
                      className="text-[26px] text-white"
                    />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Sign Up
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Hamburger
              show={showMobileMenu}
              callback={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>
        </div>

        {showMobileMenu && navLinks && <MobileNav navLinks={navLinks} />}

        <AlertDialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
          <LogoutAlert setShowLogoutModal={setShowLogoutModal} />
        </AlertDialog>

        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <LoginModal
            open={showLoginModal}
            setShowRegisterModal={setShowRegisterModal}
            setShowLoginModal={setShowLoginModal}
          />
        </Dialog>

        <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
          <RegisterModal
            open={showRegisterModal}
            setShowRegisterModal={setShowRegisterModal}
            setShowLoginModal={setShowLoginModal}
          />
        </Dialog>
      </div>
    </>
  );
};

export default Navbar;

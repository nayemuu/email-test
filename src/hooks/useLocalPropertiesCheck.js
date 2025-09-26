"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

const useLocalPropertiesCheck = () => {
  const [isLocalPropertiesChecked, setIsLocalPropertiesChecked] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Checking user was logged in or not
    const localAuth = localStorage.getItem("auth");
    // console.log("localAuth = ", localAuth);

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.refreshToken) {
        // console.log(auth);
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
          })
        );
      }
    }

    // console.log('LocalisLocalPropertiesCheck');
    setIsLocalPropertiesChecked(true);
  }, []);

  return isLocalPropertiesChecked;
};

export default useLocalPropertiesCheck;

"use client";
export const getAccessToken = () => {
  const localAuth = localStorage.getItem("auth");

  if (localAuth) {
    const auth = JSON.parse(localAuth);
    if (auth?.accessToken) {
      return auth.accessToken;
    } else {
      return "";
    }
  }
  return "";
};

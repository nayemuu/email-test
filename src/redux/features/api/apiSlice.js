import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    //console.log(getState());

    // console.log('in apiSlice prepareHeaders, token = ', token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let results = await baseQuery(args, api, extraOptions);
    // console.log("results = ", results);
    if (results?.error?.status === 401) {
      // console.log("Access token expired → trying refresh...");
      const refreshToken = api.getState()?.auth?.refreshToken;
      if (refreshToken) {
        console.log("refreshToken = ", refreshToken);
        // authApi.endpoints.updateRefreshToken.initiate({refreshToken})
        // Try refreshing the token
        const refreshResult = await baseQuery(
          {
            url: "/api/v1/auth/refresh-token",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        // console.log("refreshResult = ", refreshResult);
        if (refreshResult?.data?.accessToken) {
          // console.log("accessToken = ", refreshResult.data.accessToken);

          // console.log("inside 1");
          // console.log("pre accessToken = ", api.getState()?.auth?.accessToken);
          api.dispatch(
            userLoggedIn({
              accessToken: refreshResult.data.accessToken,
              refreshToken: refreshToken,
            })
          );

          // console.log("curr accessToken = ", api.getState()?.auth?.accessToken);
          // console.log("inside 2");

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: refreshResult.data.accessToken,
              refreshToken: refreshToken,
            })
          );

          // retry original query
          // console.log("Refresh success → retrying original query...");
          //approch 1
          // let results = await baseQuery(args, api, extraOptions);//hey chatgpt should we await it, just return  baseQuery(args, api, extraOptions);
          // console.log("results ", results);
          // return results;

          //approch 2
          return baseQuery(args, api, extraOptions); // ✅ cleaner
        } else {
          // console.log("inside , Refresh failed → logging out...");

          api.dispatch(userLoggedOut());
          localStorage.removeItem("auth");
          setTimeout(() => {
            api.dispatch(apiSlice.util.resetApiState());
          }, 1);

          // show toast, but don't return its value
          toast.error("User Session Expired! Please Login Again.");

          // return a valid error object for RTK Query
          return { error: { status: 401, data: "Session expired" } };
        }
      }
      // console.log("Refresh failed → logging out...");
      api.dispatch(userLoggedOut());
      localStorage.removeItem("auth");
      // setTimeout(() => {
      //   api.dispatch(apiSlice.util.resetApiState());
      // }, 1);

      // show toast, but don't return its value
      // toast.error("User Session Expired! Please Login Again.");

      // return a valid error object for RTK Query
      return { error: { status: 401, data: "Session expired" } };
    }

    if (results?.error?.status === "FETCH_ERROR") {
      console.log("Backend is Down");
    }

    return results;
  },
  endpoints: () => ({}),
});

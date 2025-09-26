import { apiSlice } from "../api/apiSlice";
import { profileApi } from "../profile/profileApi";
import { userLoggedIn, userLoggedOut } from "./authSlice";
import { toast } from "sonner";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   console.log("inside authApi arg = ", arg);
          const result = await queryFulfilled;
          //   console.log("inside login result = ", result);
          if (result?.data?.data?.tokens) {
            // console.log("tokens = ", result.data.data.tokens);
            dispatch(
              userLoggedIn({
                accessToken: result.data.data.tokens.access,
                refreshToken: result.data.data.tokens.refresh,
              })
            );
            dispatch(profileApi.endpoints.profile.initiate());

            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.data.tokens.access,
                refreshToken: result.data.data.tokens.refresh,
              })
            );
            setTimeout(() => {
              dispatch(apiSlice.util.resetApiState());
            }, 1);
          }
        } catch (error) {
          //
        }
      },
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   console.log("inside register arg = ", arg);
          // const result = await queryFulfilled;
          //   console.log("inside register result = ", result);
        } catch (error) {
          //
        }
      },
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/verify-email",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   console.log("inside register arg = ", arg);
          // const result = await queryFulfilled;
          //   console.log("inside register result = ", result);
        } catch (error) {
          //
        }
      },
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/logout",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   console.log("inside authApi arg = ", arg);
          const result = await queryFulfilled;
          //   console.log("inside login result = ", result);
          dispatch(userLoggedOut());
          localStorage.removeItem("auth");
          // setTimeout(() => {
          //   dispatch(apiSlice.util.resetApiState());
          // }, 1);

          setTimeout(() => {
            if (window) {
              window.location.reload();
            }
          }, 2500);
          toast.success("Log Out Successfully");
        } catch (error) {
          //
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
} = authApi;

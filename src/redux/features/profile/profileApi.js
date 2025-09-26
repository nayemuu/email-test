import { apiSlice } from "../api/apiSlice";
import { initiateProfileInfo } from "./profileSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => `/api/v1/user/profile`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside useProfileQuery = ", result);
          if (result?.data?.data?.user) {
            // console.log("user = ", result.data.data.user);
            dispatch(initiateProfileInfo(result.data.data.user));
          }
        } catch (error) {
          //
        }
      },
    }),

    // ({ query: "/api/v1/user/profile" }),
  }),
});

export const { useProfileQuery } = profileApi;

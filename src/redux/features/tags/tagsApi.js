import { apiSlice } from "../api/apiSlice";

export const tagsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => `/api/v1/tags`,
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside useProfileQuery = ", result);
        } catch (error) {
          //
        }
      },
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;

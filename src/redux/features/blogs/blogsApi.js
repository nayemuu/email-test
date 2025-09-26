import { current } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { toast } from "sonner";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["MyBlogs", "BlogList", "BookmarkedList"],
});

export const blogsApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/api/v1/blogs",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["MyBlogs"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside createBlog arg = ', arg);
          const result = await queryFulfilled;
          // console.log('inside createBlog result = ', result);
        } catch (error) {
          // console.log('inside createBlog error = ', error);
        }
      },
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/blogs/${id}`,
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["MyBlogs"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside createBlog arg = ', arg);
          const result = await queryFulfilled;
          // console.log('inside createBlog result = ', result);
        } catch (error) {
          // console.log('inside createBlog error = ', error);
        }
      },
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/v1/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyBlogs", "BlogList"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside useProfileQuery = ", result);
          toast.success("Blog deleted successfully");
        } catch (error) {
          //
        }
      },
    }),

    getMyBlogs: builder.query({
      query: ({ limit, offset }) =>
        `/api/v1/user/blogs/?limit=${limit}&offset=${offset}`,
      providesTags: ["MyBlogs"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside useProfileQuery = ", result);
        } catch (error) {
          //
        }
      },
    }),

    getBlogs: builder.query({
      query: ({ limit, offset }) =>
        `/api/v1/blogs/?limit=${limit}&offset=${offset}`,
      keepUnusedDataFor: 0,
      providesTags: ["BlogList"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside useProfileQuery = ", result);
        } catch (error) {
          //
        }
      },
    }),

    getBlogDetails: builder.query({
      query: (id) => `/api/v1/blogs/${id}`,
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

    likeUnlikeToggler: builder.mutation({
      query: (id) => ({
        url: `/api/v1/user/blogs/like/${id}`,
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log("inside likeUnlikeToggler arg = ", arg);
          const result = await queryFulfilled;
          // console.log("inside likeUnlikeToggler result = ", result);
          if (result?.data?.data) {
            // console.log("data = ", result.data.data);
            // console.log("current isLiked status = ", result.data.data.isLiked);

            dispatch(
              apiSlice.util.updateQueryData(
                "getBlogDetails",
                arg,
                (draftState) => {
                  // console.log("inside updateQueryData");
                  // console.log("draftState = ", current(draftState));
                  // console.log(
                  //   "draftState = ",
                  //   current(draftState).data.likesCount
                  // );
                  draftState.data.isLiked = result.data.data.isLiked;
                  draftState.data.likesCount = result.data.data.isLiked
                    ? parseInt(draftState.data.likesCount) + 1
                    : parseInt(draftState.data.likesCount) - 1;
                }
              )
            );
          }
        } catch (error) {
          // console.log('inside createBlog error = ', error);
        }
      },
    }),

    bookmarkToggler: builder.mutation({
      query: (id) => ({
        url: `/api/v1/user/blogs/bookmarks/${id}`,
        method: "POST",
      }),

      invalidatesTags: ["BookmarkedList"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log("inside likeUnlikeToggler arg = ", arg);
          const result = await queryFulfilled;
          // console.log("inside likeUnlikeToggler result = ", result);
        } catch (error) {
          // console.log('inside createBlog error = ', error);
        }
      },
    }),

    searchBlogs: builder.query({
      query: ({ limit, offset, keyword }) =>
        `/api/v1/blogs/search/?limit=${limit}&offset=${offset}&query=${keyword}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside useProfileQuery = ", result);
        } catch (error) {
          //
        }
      },
    }),

    getBookmarkedBlogs: builder.query({
      query: ({ limit, offset }) =>
        `/api/v1/user/blogs/bookmarks/?limit=${limit}&offset=${offset}`,
      keepUnusedDataFor: 0,
      providesTags: ["BookmarkedList"],
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

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetMyBlogsQuery,
  useGetBlogsQuery,
  useGetBlogDetailsQuery,
  useLikeUnlikeTogglerMutation,
  useSearchBlogsQuery,
  useBookmarkTogglerMutation,
  useGetBookmarkedBlogsQuery,
} = blogsApi;

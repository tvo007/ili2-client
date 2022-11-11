// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/local/signup",
        method: "POST",
        body: { ...data },
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/local/signin",
        method: "POST",
        body: { ...data },
        credentials: "include",
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getMe: builder.query({
      query: () => `/users/me`,
      method: "GET",
      credentials: "include",
      // headers: {
      //   credentials: "include",
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      //   "Access-Control-Allow-Origin": "http://localhost:5000",
      // },
      transformResponse: (response, meta, arg) => response,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateMe: builder.query({
      query: (id) => `/users/${id}`,
      method: "PUT",
      credentials: "include",
      // headers: {
      //   credentials: "include",
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      //   "Access-Control-Allow-Origin": "http://localhost:5000",
      // },
      transformResponse: (response, meta, arg) => response,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetMeQuery,
} = authApiSlice;

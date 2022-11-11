import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const columnsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.position - b.position,
}); //sorts projects by ascending alpha order

const initialState = columnsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColumnsByProjectId: builder.query({
      query: (projectId) => `/columns/project/${projectId}`,
      transformResponse: (response, meta, arg) => response,
      providesTags: (result, error, id) => [{ type: "Columns", id }],
    }),
    // getColumnsByProjectId: builder.query({
    //   query: (projectId) => `/columns/project/${projectId}`,
    //   transformResponse: (responseData) => {
    //     const loadedColumns = responseData.map((col) => {
    //       //map logic would go here
    //       return col;
    //     });

    //     return columnsAdapter.setAll(initialState, loadedColumns);
    //   },
    //   providesTags: (result, error, arg) => [
    //     { type: "Column", id: "LIST" },
    //     ...result.ids.map((id) => ({ type: "Column", id })),
    //   ],
    // }),
  }),
});

export const { useGetColumnsByProjectIdQuery } = extendedApiSlice;

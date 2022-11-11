import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const projectsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
}); //sorts projects by ascending alpha order

const initialState = projectsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getProjects: builder.query({
    //   query: () => "/projects",
    //   transformResponse: (responseData) => {
    //     const loadedProjects = responseData.map((project) => {
    //       //map logic would go here
    //       return project;
    //     });
    //     return projectsAdapter.setAll(initialState, loadedProjects);
    //   },
    //   providesTags: (result, error, arg) => [
    //     { type: "Project", id: "LIST" },
    //     ...result.ids.map((id) => ({ type: "Project", id })),
    //   ],
    // }),
    getProjectsByUserId: builder.query({
      query: (id) => `/projects/user/${id}`,
      transformResponse: (responseData) => {
        const loadedProjects = responseData.map((project) => {
          //logic here
          return project;
        });
        return projectsAdapter.setAll(initialState, loadedProjects);
      },
      providesTags: (result, error, arg) => [
        { type: "Project", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Project", id })),
      ],
    }),

    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      transformResponse: (response, meta, arg) => response,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
    addNewProject: builder.mutation({
      query: (initialProject) => ({
        url: "/projects",
        method: "POST",
        body: {
          ...initialProject,
          userId: String(initialProject.userId),
        },
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: (initialProject) => ({
        url: `/projects/${initialProject.id}`,
        method: "PUT",
        body: {
          ...initialProject,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProjectsByUserIdQuery,
  useGetProjectByIdQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = extendedApiSlice;

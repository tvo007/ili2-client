import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const tasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
}); //sorts projects by ascending alpha order

const initialState = tasksAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasksByProjectId: builder.query({
      query: (projectId) => `/tasks/project/${projectId}`,
      transformResponse: (responseData) => {
        const loadedTasks = responseData.map((task) => {
          //map logic would go here
          return task;
        });
        return tasksAdapter.setAll(initialState, loadedTasks);
      },
      providesTags: (result, error, arg) => [
        { type: "Task", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Task", id })),
      ],
      // providesTags: (result, error, arg) => [
      //   { type: "Task", key: "KEYS" },
      //   ...result.keys.map((key) => ({ type: "Task", key })),
      // ],
    }),

    getBoardByProjectId: builder.query({
      query: (projectId) => `/board/project/${projectId}`,
      transformResponse: (response, meta, arg) => response,
      providesTags: (result, error, id) => [{ type: "Board", id }],
    }),

    // getColumnsByProjectId: builder.query({
    //   query: (projectId) => `/columns/project/${projectId}`,
    //   transformResponse: (response, meta, arg) => response,
    //   providesTags: (result, error, id) => [{ type: "Columns", id }],
    // }),
    // getProjectsByUserId: builder.query({
    //   query: (id) => `/projects/?userId=${id}`,
    //   transformResponse: (responseData) => {
    //     const loadedProjects = responseData.map((project) => {
    //       //logic here
    //       return project;
    //     });
    //     return postsAdapter.setAll(initialState, loadedProjects);
    //   },
    //   providesTags: (result, error, arg) => [
    //     ...result.ids.map((id) => ({ type: "Project", id })),
    //   ],
    // }),
    addNewTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => response,
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.taskId}`,
        method: "PUT",
        body: {
          name: data.name,
          desc: data.desc,
          targetColId: data.targetColId,
          sourceColId: data.sourceColId,
          projectId: data.projectId,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
    moveTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/key/${data.taskKey}`,
        method: "PATCH",
        body: {
          sourceColId: data.sourceColId,
          targetColId: data.targetColId,
          targetPosition: data.targetPosition,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
    // moveTaskWithinColumn: builder.mutation({
    //   query: (data) => ({
    //     url: `/columns/${data.columnId}`,
    //     method: "PATCH",
    //     body: {
    //       order: data.order,
    //     },
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     { type: "Columns", id: arg.id },
    //   ],
    // }),
    deleteTask: builder.mutation({
      query: ({ taskId }) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
        body: { taskId },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
  }),
});

export const {
  useGetTasksByProjectIdQuery,
  useAddNewTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetBoardByProjectIdQuery,
  useMoveTaskMutation,
} = extendedApiSlice;

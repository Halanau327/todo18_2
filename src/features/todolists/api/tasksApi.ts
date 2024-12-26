import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "../../../app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTasks: builder.query<GetTasksResponse, string>({
        query: (todolistId) => {
          return {
            method: "GET",
            url: `todo-lists/${todolistId}/tasks`,
          }
        },
        providesTags: ["Task"],
      }),
      createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
        query: ({ title, todolistId }) => {
          return {
            method: "POST",
            url: `todo-lists/${todolistId}/tasks`,
            body: { title, todolistId },
          }
        },
        invalidatesTags: ["Task"],
      }),
      deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
        query: ({ todolistId, taskId }) => {
          return {
            method: "DELETE",
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
            body: { todolistId, taskId },
          }
        },
        invalidatesTags: ["Task"],
      }),
      updateTask: builder.mutation<
        BaseResponse<{ item: DomainTask }>,
        {
          todolistId: string
          taskId: string
          model: UpdateTaskModel
        }
      >({
        query: ({ todolistId, taskId, model }) => {
          return {
            method: "PUT",
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
            body: model,
          }
        },
        invalidatesTags: ["Task"],
      }),
    }
  },
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi


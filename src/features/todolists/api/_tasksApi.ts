import { instance } from "common/instance"
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
            body: { todolistId, taskId, model },
          }
        },
        invalidatesTags: ["Task"],
      }),
    }
  },
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { taskId, todolistId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

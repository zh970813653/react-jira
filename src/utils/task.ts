import { useHttp } from "./http";
import {  QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from "./use-optimistic-options";
import { Project } from "../types/project";
import { useDebounce } from ".";
import { SortProps } from "./kanban";

// 获取所有任务列表
export const useTasks = (params?: Partial<Task>) => {
    const http = useHttp()
    const debouncedParam = { ...params, name: useDebounce(params?.name, 200) };
    // useQuery 的key 不单单是可以是一个字符串 也可以是一个['project',params]  这个意思是当params变化的时候 会重新触发这个方法
    return useQuery<Task[]>(['tasks',debouncedParam],()=> {
       return http('tasks',{data:debouncedParam})
    })
}
export const useAddTask= (queryKey: QueryKey) => {
    const http = useHttp()
    return useMutation((params: Partial<Task>)=>http(`tasks`,{
        data:params,
        method:'POST'
    }),
    useAddConfig(queryKey)
    )
}

// 获取任务详情
export const useTask = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(["task", { id }], () => client(`tasks/${id}`), {
      enabled: Boolean(id),
    });
  };
  
  export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
      (params: Partial<Task>) =>
        client(`tasks/${params.id}`, {
          method: "PATCH",
          data: params,
        }),
      useEditConfig(queryKey)
    );
  };
  
  export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      ({ id }: { id: number }) =>
        client(`tasks/${id}`, {
          method: "DELETE",
        }),
      useDeleteConfig(queryKey)
    );
  };
  
  export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
      return client("tasks/reorder", {
        data: params,
        method: "POST",
      });
    }, useReorderTaskConfig(queryKey));
  };
  
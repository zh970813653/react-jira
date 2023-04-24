import { useHttp } from "./http";
import {  QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { useAddConfig } from "./use-optimistic-options";

export const useTasks = (params?: Partial<Task>) => {
    const http = useHttp()
    // useQuery 的key 不单单是可以是一个字符串 也可以是一个['project',params]  这个意思是当params变化的时候 会重新触发这个方法
    return useQuery<Task[]>(['tasks',params],()=> {
       return http('tasks',{data:params})
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
import { useHttp } from "./http";
import {  useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { TaskType } from "../types/task-type";

export const useTaskTypes = () => {
    const http = useHttp()
    // useQuery 的key 不单单是可以是一个字符串 也可以是一个['project',params]  这个意思是当params变化的时候 会重新触发这个方法
    return useQuery<TaskType[]>(['taskTypes'],()=> {
       return http('taskTypes')
    })
}

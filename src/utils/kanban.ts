
import { useHttp } from "./http";
import {  QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Project } from "../types/project";
import { useAddConfig } from "./use-optimistic-options";

export const useKanbans = (params?: Partial<Kanban>) => {
    const http = useHttp()
    return useQuery<Kanban[]>(['kanbans',params],()=> {
       return http('kanbans',{data:params})
    })
}

export const useAddKanban = (queryKey: QueryKey) => {
    const http = useHttp()
    return useMutation((params: Partial<Kanban>)=>http(`kanbans`,{
        data:params,
        method:'POST'
    }),
    useAddConfig(queryKey)
    )
}
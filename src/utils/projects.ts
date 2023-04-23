
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";
import { Project } from "../types/project";

export const useProjects = (params?: Partial<Project>) => {
    const http = useHttp()
    // useQuery 的key 不单单是可以是一个字符串 也可以是一个['project',params]  这个意思是当params变化的时候 会重新触发这个方法
    return useQuery<Project[]>(['projects',params],()=> {
       return http('projects',{data:params})
    })
}

export const useEditProject = (queryKey: QueryKey) => {
    // const {run,...result} = useAsync()
    const http = useHttp()  
    return useMutation((params: Partial<Project>)=>http(`projects/${params.id}`,{
        method: 'PATCH',
        data: params
    }),
    useEditConfig(queryKey)
    )
}

export const useAddProject = (queryKey: QueryKey) => {
    const http = useHttp()
    return useMutation((params: Partial<Project>)=>http(`projects`,{
        data:params,
        method:'POST'
    }),
    useAddConfig(queryKey)
    )
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const http = useHttp()
    return useMutation(({id}: {id:number})=>http(`projects/${id}`,{
        method:'DELETE'
    }),
    useDeleteConfig(queryKey)
    )
}

export const useProject = (id?: number) => {
    const http = useHttp()
    return useQuery<Project>(
        ['project',id],
        ()=> http(`projects/${id}`),
        {
            enabled: !!id // 当id有值的时候 才会触发
        }
    )
}
import { Project } from "../screens/project-list/List";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (params?: Partial<Project>) => {
    const http = useHttp()

    // useQuery 的key 不单单是可以是一个字符串 也可以是一个['project',params]  这个意思是当params变化的时候 会重新触发这个方法
    return useQuery<Project[]>(['projects',params],()=> {
       return http('projects',{data:params})
    })

    // const {run,...result} = useAsync<Project[]>()
    // const fetchProjects = useCallback(() => http('projects',{data:cleanObject(params)}),[http,params])
    // useEffect(()=> {
    //     run(fetchProjects(),{
    //         retry: fetchProjects
    //     })
    // },[params,run,fetchProjects])
    // return {
    //     ...result
    // }
}

export const useEditProject = () => {
    // const {run,...result} = useAsync()
    const http = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Project>)=>http(`projects/${params.id}`,{
        method: 'PATCH',
        data: params
    }),{
        onSuccess: ()=> queryClient.invalidateQueries('projects')
    })
   
    // const mutate = (params: Partial<Project>) => {
    //     return run(http(`projects/${params.id}`, {
    //         data: params,
    //         method: 'PATCH'
    //     }))
    // }

    // return {
    //     mutate,
    //     ...result
    // }
}

export const useAddProject = () => {

    // const {run,...result} = useAsync()
    const http = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Project>)=>http(`projects`,{
        data:params,
        method:'POST'
    }),{
        onSuccess: ()=> queryClient.invalidateQueries('projects')
    })
    // const mutate = (params: Partial<Project>) => {
    //     run(http(`projects/${params.id}`, {
    //         data: params,
    //         method: 'POST'
    //     }))
    // }

    // return {
    //     mutate,
    //     ...result
    // }
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
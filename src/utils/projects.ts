import { useCallback, useEffect } from "react";
import { Project } from "../screens/project-list/List";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { cleanObject } from ".";

export const useProjects = (params?: Partial<Project>) => {
    const http = useHttp()
    const {run,...result} = useAsync<Project[]>()
    const fetchProjects = useCallback(() => http('projects',{data:cleanObject(params)}),[http,params])
    useEffect(()=> {
        run(fetchProjects(),{
            retry: fetchProjects
        })
    },[params,run,fetchProjects])
    return {
        ...result
    }
}

export const useEditProject = () => {
    const {run,...result} = useAsync()
    const http = useHttp()
   
    const mutate = (params: Partial<Project>) => {
        return run(http(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }

    return {
        mutate,
        ...result
    }
}

export const useAddProject = () => {
    const {run,...result} = useAsync()
    const http = useHttp()
    const mutate = (params: Partial<Project>) => {
        run(http(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }

    return {
        mutate,
        ...result
    }
}
import { useEffect } from "react";
import { Project } from "../screens/project-list/List";
import { useHttp } from "./http";
import { useAsnc } from "./use-async";
import { cleanObject } from ".";

export const useProjects = (params?: Partial<Project>) => {
    const http = useHttp()
    const {run,...result} = useAsnc<Project[]>()
    useEffect(()=> {
        run(http('projects',{data:cleanObject(params)}))
    },[params])
    return {
        ...result
    }
}

export const useEditProject = () => {
    const {run,...result} = useAsnc()
    const http = useHttp()
    const mutate = (params: Partial<Project>) => {
        run(http(`projects/${params.id}`, {
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
    const {run,...result} = useAsnc()
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
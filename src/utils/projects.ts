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
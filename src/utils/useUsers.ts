import { useEffect } from "react";
import { Project } from "../screens/project-list/List";
import { useHttp } from "./http";
import { useAsnc } from "./use-async";
import { cleanObject } from ".";
import { User } from "../screens/project-list/SearchPanel";

export const useUsers = (params?: Partial<User>) => {
    const http = useHttp()
    const {run,...result} = useAsnc<User[]>()
    useEffect(()=> {
        run(http('users',{data:cleanObject(params || {})}))
    },[params])
    return {
        ...result
    }
}
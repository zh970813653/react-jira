import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { cleanObject } from ".";
import { User } from "../screens/project-list/SearchPanel";
import { useQuery } from "react-query";

export const useUsers = (params?: Partial<User>) => {
    const http = useHttp()
    return useQuery<User[]>(['users',params], () => http('users',{data: params}))
}
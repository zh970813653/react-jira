
import { useHttp } from "./http";
import {  QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Project } from "../types/project";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

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

export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      ({ id }: { id: number }) =>
        client(`kanbans/${id}`, {
          method: "DELETE",
        }),
      useDeleteConfig(queryKey)
    );
  };
  
  export interface SortProps {
    // 要重新排序的 item
    fromId: number;
    // 目标 item
    referenceId: number;
    // 放在目标item的前还是后
    type: "before" | "after";
    fromKanbanId?: number;
    toKanbanId?: number;
  }
  
//   export const useReorderKanban = (queryKey: QueryKey) => {
//     const client = useHttp();
//     return useMutation((params: SortProps) => {
//       return client("kanbans/reorder", {
//         data: params,
//         method: "POST",
//       });
//     }, useReorderKanbanConfig(queryKey));
//   };
  
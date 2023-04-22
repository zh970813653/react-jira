import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (queryKey: QueryKey,callback: (target: any,old?: any[])=> any[]) => {
   const queryClient = useQueryClient()
   return {
        onSuccess: ()=> queryClient.invalidateQueries(queryKey),
        async onMutate(target: any){ // 一发生useMutation 立刻调用onMutate
            const previousItems = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey,(old?: any[])=>{ 
                return callback(target,old)
            })  
            // 返回的类型会被error接收
            return {
                previousItems
            }
        },
        // 当操作异常 或者操作没有成功
        onError(error :any,newItem:any,context:any) {
            queryClient.setQueriesData(queryKey,context?.previousItems)
        }
   }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey,(target,old) => old?.filter(item => item.id !== target.id) || [])
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey,(target,old) => old?.map(item => item.id === target.id ? {...item,...target} : item) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey,(target,old) => old? [...old, target]: [])
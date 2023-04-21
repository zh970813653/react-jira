import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "."

interface State<T>{
    error: Error | null
    data: T | null
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    error: null,
    data: null,
    stat: 'idle'
}
const defaultConfig = {
    throwOnError: false
}


const useSafeDispatch = <T>(dispatch:(...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback((...args:T[])=> {
        if (mountedRef.current) {
            dispatch(...args )
        }else{
            void 0
        }
    },[dispatch,mountedRef])
}

export const useAsync = <T>(initialState?:State<T>,initialConfig?:typeof defaultConfig) => {
    const config = {...defaultConfig,...initialConfig}
    const [state, dispatch] = useReducer((state:State<T>, action:Partial<State<T>>)=>{
        return {
            ...state,
            ...action
        }
    },{
        ...defaultInitialState,
        ...initialState
    })

    const safeDispatch = useSafeDispatch(dispatch)
    const [retry,setRetry] = useState(()=>()=>{})
    const setData = useCallback((data: T) => safeDispatch({
        data,
        error: null,
        stat: 'success'
    }),[safeDispatch])
    const setError = useCallback((error: Error) => safeDispatch({
        data: null, 
        error,
        stat:'error'
    }),[safeDispatch])
    const run = useCallback(
        (promise:Promise<T>,runConfig?:{ retry: ()=> Promise<T>}) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 promise 类型数据')
        }
        setRetry(()=>()=> {
            if (runConfig?.retry) {
                run (runConfig?.retry(),runConfig)
            }
        })
        safeDispatch({stat:"loading"})
        return promise.then(result => {
                setData(result)
                return result

        }).catch(error => {
            setError(error)
            if (config.throwOnError) {
                return Promise.reject(error)
            }
            return error 
        })
    },[config.throwOnError,setData,setError,safeDispatch])

    // const retry = () => {
    //     run(oldPromise)
    // }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        retry,
        setData,
        ...state
    }
}
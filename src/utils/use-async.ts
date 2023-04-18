import { useCallback, useState } from "react"
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
export const useAsync = <T>(initialState?:State<T>,initialConfig?:typeof defaultConfig) => {
    const config = {...defaultConfig,...initialConfig}
    const [state,setState] = useState({
        ...defaultInitialState,
        ...initialState
    })
    const mountedRef = useMountedRef()
    const [retry,setRetry] = useState(()=>()=>{})
    const setData = useCallback((data: T) => setState({
        data,
        error: null,
        stat: 'success'
    }),[])
    const setError = useCallback((error: Error) => setState({
        data: null, 
        error,
        stat:'error'
    }),[])
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
        setState(prevState => ({...prevState,stat: 'loading'}))
        return promise.then(result => {
            if (mountedRef.current) {
                setData(result)
                return result
            }

        }).catch(error => {
            setError(error)
            if (config.throwOnError) {
                return Promise.reject()
            }
            return error 
        })
    },[config.throwOnError,mountedRef,setData,setError])

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
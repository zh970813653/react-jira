import { useState } from "react"

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
export const useAsnc = <T>(initialState?:State<T>,initialConfig?:typeof defaultConfig) => {
    const config = {...defaultConfig,...initialConfig}
    const [state,setState] = useState({
        ...defaultInitialState,
        ...initialState
    })
    const [retry,setRetry] = useState(()=>()=>{})
    const setData = (data: T) => setState({
        data,
        error: null,
        stat: 'success'
    })
    const setError = (error: Error) => setState({
        data: null, 
        error,
        stat:'error'
    })
    const run = (promise:Promise<T>,runConfig?:{ retry: ()=> Promise<T>}) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 promise 类型数据')
        }
        setRetry(()=>()=> {
            if (runConfig?.retry) {
                run (runConfig?.retry(),runConfig)
            }
        })
        setState({...state,stat: 'loading'})
        return promise.then(result => {
            setData(result)
            return result
        }).catch(error => {
            setError(error)
            if (config.throwOnError) {
                return Promise.reject()
            }
            return error 
        })
    }

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
import { type } from "os";
import { useEffect, useRef, useState } from "react"

export const isFalsy = (value:any) => value === 0
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (object?: { [key: string]: unknown }) => {
    // Object.assign({}, object)
    if (!object) {
      return {};
    }
    const result = { ...object };
    Object.keys(result).forEach((key) => {
      const value = result[key];
      if (isVoid(value)) {
        delete result[key];
      }
    });
    return result;
  };

export const paramsToString = (object:any) => {
    let params = ''
    if(!object){
        return ''
    }
    Object.keys(object).forEach((key:any) => {
        const value = object[key]
        if (value || isFalsy(value)) {
            params += params ? `&${key}=${value}` : `?${key}=${value}`
        }
    })

    return params
}

export const useDebounce = <V>(value:V,delay?:number) => {
    const [debounceValue,setDebounceValue] = useState(value)
    useEffect(() => {
        const timerId = setTimeout(()=> setDebounceValue(value),delay)
        // 在useEffect重新执行的时候 会执行上一个useEffect的返回函数
        return () => clearTimeout(timerId)
    },[value,delay])

    return debounceValue
}

//自己的useArray

export const useArray = <T>(val:T[]) => {
    const [value,setValue] = useState(val)
    const add = (v: T) => {
        setValue([...value,v])
    }
    const removeIndex = (index:number) => {
        const array = value.slice()
        array.splice(index,1)
        setValue(array)
    }
    const clear = () : void => {
        setValue([])
    }
    return {
        value,
        add,
        removeIndex,
        clear
    }
}

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    // useRef在整个生命周期中 都不会变化
    const oldTitle = useRef(document.title).current
    useEffect(()=>{
        document.title = title
    },[title])

    useEffect (()=> {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }   
            
        }
    },[keepOnUnmount,oldTitle])
}

export const resetRoute = () => (window.location.href = window.location.origin);


// 这个hook的作用是为了避免页面卸载的时候，已经卸载的页面请求没有完毕从而导致控制台报错
export const useMountedRef = () => {
    const mountedRef = useRef(false)
    useEffect(()=> {
        mountedRef.current =  true
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}
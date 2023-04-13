import { type } from "os";
import { useEffect, useState } from "react"

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
        debugger
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


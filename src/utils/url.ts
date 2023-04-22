import { useMemo } from 'react'
import {URLSearchParamsInit, useSearchParams} from 'react-router-dom'
import { cleanObject } from '.'

export const useUrlQueryParam = <S extends string>(keys: S[]) => {
    const [searchParams] = useSearchParams()
    const setUrlSearchParams = useSetUrlSearchParams()
    return [
        useMemo(()=>(
            keys.reduce((prev,key) => {
                return {
                    ...prev,
                    [key]: searchParams.get(key) || ''
                }
            },{} as {[key in S]: string})
        ),[searchParams,keys]),
        (param: {[key in S]?: unknown}) => {
            return setUrlSearchParams(param)
        }
    ] as const
}

export const useSetUrlSearchParams = () => {
    const [searchParams,setSearchParam] = useSearchParams()
    return (param: {[key in string]: unknown}) => {
        // fromEntries 把健值对 转换成一个对象 或者说 把带有Symbol.iterator属性的值转成对象
        const o = cleanObject({...Object.fromEntries(searchParams),...param}) as URLSearchParamsInit
        return setSearchParam(o)
    }
}
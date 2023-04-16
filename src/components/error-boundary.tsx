// 实现一个错误边界 必须要用calssComponents
import React, { PropsWithChildren, ReactNode } from "react";

interface Props {
    fallbackRender: (props: {error:Error |null}) => React.ReactElement // React.ReactElement 就是jsx的类型 
}

export class ErrorBoundary extends React.Component<PropsWithChildren<Props>, {error:Error | null}>{
    state = {error: null}

    // 当子组建抛出异常后， 这里会进行接受并且调用
    static getDerivedStateFromError(error: Error){
        return {
            error
        }
    }

    render(){
        const {error} = this.state
        const {fallbackRender,children} = this.props

        if (error) {
            return fallbackRender({error})
        }
        return children
    }
}
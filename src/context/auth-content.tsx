import React, { ReactNode, useCallback, useEffect } from "react";
import { User } from "../screens/project-list/SearchPanel";
import * as auth from "../auth-provider";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import * as authStore from '../store/auth.slice'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me',{token})
    user = data.user
  }
  return user
}

// export interface Auth  {
//   user: User|null
//   register: (form: AuthForm) => Promise<void>
//   login: (form: AuthForm) => Promise<void>
//   logout: () => Promise<void>
// }

// const AuthContext = React.createContext<Auth| undefined>(undefined);

// AuthContext.displayName = 'AuthContext'


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {run,error,isIdle,isLoading,data:user} = useAsync<User| null>()
  const dispatch: (...args : any []) => Promise<User> = useDispatch()

  useEffect(()=> {
    run(dispatch(authStore.bootstrap()))
  },[run])
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (error) {
    return <FullPageErrorFallback error={error} />
  }
  return (
    <div>
      {children}
    </div>
  )
};

export const useAuth = () => {
  const dispatch: (...args: any[])=> Promise<User> = useDispatch()

  const user = useSelector(authStore.selectUser)
  const login = useCallback((form:AuthForm) => dispatch(authStore.login(form)),[dispatch])
  const register = useCallback((form:AuthForm) => dispatch(authStore.register(form)),[dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()),[dispatch])
  return {
    user,
    login,
    register,
    logout
  }
}
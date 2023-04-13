import React, { ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../screens/project-list/SearchPanel";
import * as auth from "../auth-provider";
import { http } from "../utils/http";
interface AuthForm {
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

export interface Auth  {
  user: User|null
  register: (form: AuthForm) => Promise<void>
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<Auth| undefined>(undefined);

AuthContext.displayName = 'AuthContext'


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))  
  useEffect(()=> {
    bootstrapUser().then(setUser)
  },[])
  return (
    <AuthContext.Provider value={{login,register,logout,user}} children={children} />
  )
};

export const useAuth = ():Auth | Error => {
  const context = useContext(AuthContext)
  if (!context) { 
    return new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
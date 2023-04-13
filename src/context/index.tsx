import { ReactChildren, ReactNode } from "react";
import { AuthProvider } from "./auth-content";
import React from "react";

export const AppProviders = ({children}:{children: ReactNode}) => {
    return <AuthProvider children={children} />
}
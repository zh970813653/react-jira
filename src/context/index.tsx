import React, { ReactChildren, ReactNode } from "react";
import { AuthProvider } from "./auth-content";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider children={children} />
      </QueryClientProvider>
    </Provider>
  );
};

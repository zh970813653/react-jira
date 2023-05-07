import React from "react";
import { Auth, useAuth } from "./context/auth-content";
// import { AuthenticatedApp } from "./authenticated-app";
// import { UnAuthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "./components/lib";

// 启动 React懒加载
const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));
const UnAuthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth() as Auth;
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

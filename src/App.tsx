import React from "react";
import { Auth, useAuth } from "./context/auth-content";
import { AuthenticatedApp } from "./authenticated-app";
import { UnAuthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallback } from "./components/lib";

function App() {
  const { user } = useAuth() as Auth;
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;

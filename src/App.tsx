import React from 'react'
import { Auth, useAuth } from './context/auth-content'
import { AuthenticatedApp } from './authenticated-app'
import { UnAuthenticatedApp } from './unauthenticated-app'

function App() {
  const {user} = useAuth() as Auth
  return (
    <div >
      {user ? <AuthenticatedApp />:<UnAuthenticatedApp/>}
    </div>
  )
}

export default App

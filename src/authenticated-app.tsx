import React from 'react'
import ProjectListScreen from './screens/project-list'
import { Auth, useAuth } from './context/auth-content'

export const AuthenticatedApp = () => {
  const {logout} = useAuth() as Auth
  return (
    <div >
      <button onClick={logout}>登出</button>
      <ProjectListScreen></ProjectListScreen>
    </div>
  )
}

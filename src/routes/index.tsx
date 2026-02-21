/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from 'react-router'
import { EmployeeRoutes } from './EmployeeRoutes'
import { ManagerRoutes } from './ManagerRoutes'
import { AuthRoutes } from './AuthRoutes'
import { Loading } from '../components/Loading'
import { useAuth } from '../hooks/useAuth'

const loading = false

export function Routes() {
  const { session } = useAuth()
  console.log('AuthContext:', session?.user.role)

  function Route() {
    switch (session?.user.role) {
      case 'employee':
        return <EmployeeRoutes />
      case 'manager':
        return <ManagerRoutes />
      default:
        return <AuthRoutes />
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  )
}

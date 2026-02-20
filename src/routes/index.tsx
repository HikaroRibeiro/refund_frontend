/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from 'react-router'
import { EmployeeRoutes } from './EmployeeRoutes'
import { ManagerRoutes } from './ManagerRoutes'
import { AuthRoutes } from './AuthRoutes'
import { Loading } from '../components/Loading'

const loading = false

const session = {
  user: {
    role: 'guest',
  },
}

export function Routes() {
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from 'react-router'
import { EmployeeRoutes } from './EmployeeRoutes'
import { ManagerRoutes } from './ManagerRoutes'
import { AuthRoutes } from './AuthRoutes'

export function Routes() {
  return (
    <BrowserRouter>
      <ManagerRoutes />
    </BrowserRouter>
  )
}

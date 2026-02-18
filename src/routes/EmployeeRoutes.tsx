import { Routes, Route } from 'react-router'
import Refunds from '../pages/Refunds'
import NotFound from '../pages/NotFound'
import { AppLayout } from '../components/App-layout'
import Confirm from '../pages/Confirm'

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Refunds />} />
        <Route path="/confirm" element={<Confirm />}></Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

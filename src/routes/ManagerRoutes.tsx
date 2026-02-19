import { Routes, Route } from 'react-router'
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard'
import { AppLayout } from '../components/App-layout'
import Refunds from '../pages/Refunds'

export function ManagerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/refunds/:id" element={<Refunds />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

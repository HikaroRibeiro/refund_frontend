import { Route, Routes } from 'react-router'

import { AuthLayout } from '../components/Auth-layout'
import { SignIn } from '../pages/SignIn'
import NotFound from '../pages/NotFound'
import { SignUp } from '../pages/SignUp'

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

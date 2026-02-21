import { use } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export function useAuth() {
  const auth = use(AuthContext)
  return auth
}

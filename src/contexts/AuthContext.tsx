/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from 'react'

type AuthContextType = {
  session: null | UserApiResponse
  save: (data: UserApiResponse) => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<null | UserApiResponse>(null)

  function save(data: UserApiResponse) {
    setSession(data)
  }

  return (
    <AuthContext.Provider value={{ session, save }}>
      {children}
    </AuthContext.Provider>
  )
}

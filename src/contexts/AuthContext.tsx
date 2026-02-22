/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, useEffect } from 'react'

type AuthContextType = {
  isLoading: boolean
  session: null | UserApiResponse
  save: (data: UserApiResponse) => void
  logout: () => void
}

const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<null | UserApiResponse>(null)
  const [isLoading, setIsLoading] = useState(true)

  function save(data: UserApiResponse) {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data))
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)

    console.log('Saving session:', data)

    setSession(data)
  }

  function logout() {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)
    setSession(null)
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

    if (token && user) {
      setSession({ token, user: JSON.parse(user).user })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ session, save, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

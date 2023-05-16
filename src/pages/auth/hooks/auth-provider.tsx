/**
 * @description 权限校验
 * @author clyan
 */

import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { fakeAuthProvider } from '../auth'

export interface AuthContextType {
  user: any
  signIn: (user: string, callback: VoidFunction) => void
  signOut: (callback: VoidFunction) => void
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string | null>()

  const signIn = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signIn(() => {
      setUser(newUser)
      callback()
    })
  }

  const signOut = (callback: VoidFunction) => {
    return fakeAuthProvider.signOut(() => {
      setUser(null)
      callback()
    })
  }

  const value = { user, signIn, signOut }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

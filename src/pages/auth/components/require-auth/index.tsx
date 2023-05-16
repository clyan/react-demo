/**
 * @description 必须登录的页面
 * @author clyan
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/auth-provider'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    // 重定向到login页，并记住当前页，登录后直接跳转到当前页
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return children
}

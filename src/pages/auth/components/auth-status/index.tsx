/**
 * @description 鉴权状态
 * @author clyan
 */

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth-provider'

export function AuthStatus() {
  const auth = useAuth()
  const navigate = useNavigate()

  if (!auth.user)
    return <p>You are not logged in.</p>

  return (
    <p>
      <span>
        Welcome
        {auth.user}
        !
      </span>
      <button
        onClick={() => {
          auth.signOut(() => navigate('/'))
        }}
      >
        Sign out
      </button>
    </p>
  )
}

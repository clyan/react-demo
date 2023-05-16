/**
 * @description 应用主布局
 * @author clyan
 */

import { Link, Outlet } from 'react-router-dom'
import { AuthStatus } from '../auth/components/auth-status'
import { RouterKey } from '../../router/models/enums'

export function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">WelCome Page</Link>
        </li>
        <li>
          <Link to={RouterKey.ReactTablePage}>React Table Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  )
}

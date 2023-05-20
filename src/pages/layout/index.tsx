/**
 * @description 应用主布局
 * @author clyan
 */

import { Outlet } from 'react-router-dom'

import { AuthStatus } from '../auth/components/auth-status'
import { Menu } from './components/menu'

export function Layout() {
  return (
    <div>
      <header>
        <AuthStatus />
      </header>
      <main>
        <aside>
          <Menu />
        </aside>
        <article>
          <Outlet />
        </article>
      </main>
    </div>
  )
}

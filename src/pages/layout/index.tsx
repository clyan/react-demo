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
      <header className="flex justify-end">
        <AuthStatus />
      </header>
      <main className="flex">
        <aside>
          <Menu />
        </aside>
        <article className="p-5">
          <Outlet />
        </article>
      </main>
    </div>
  )
}

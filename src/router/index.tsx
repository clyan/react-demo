/**
 * @description App 路由文件
 * @author clyan
 */

import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/login'
import { ReactTablePage } from '../pages/react-table-page'
import { Layout } from '../pages/layout'
import { Home } from '../pages/home'
import { RequireAuth } from '../pages/auth/components/require-auth'
import { NoMatch } from '../pages/no-match'
import { KonvaPage } from '../pages/konva-page'
import { RouterKey } from './models/enums'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: RouterKey.Home,
        element: <Home />,
      },
      {
        path: RouterKey.Login,
        element: <Login />,
      },
      {
        path: RouterKey.ReactTablePage,
        element: (
          <RequireAuth>
            <ReactTablePage />
          </RequireAuth>
        ),
      },
      {

        path: RouterKey.KonvaPage,
        element: (
          <RequireAuth>
            <KonvaPage />
          </RequireAuth>
        ),
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
])

export default router

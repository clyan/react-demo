/**
 * @description App 路由文件
 * @author clyan
 */

import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/login'
import { ReactTablePage } from '../pages/react-table-page'
import { Layout } from '../pages/layout'
import { Welcome } from '../pages/welcome'
import { RequireAuth } from '../pages/auth/components/require-auth'
import { NoMatch } from '../pages/no-match'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/react-table-page',
        element: (
          <RequireAuth>
            <ReactTablePage />
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

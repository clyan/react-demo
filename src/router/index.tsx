/**
 * @description App 路由文件
 * @author clyan
 */

import {
  createBrowserRouter,
} from 'react-router-dom'

import AuthLayout from '../pages/auth'
import Login from '../pages/login'
import { ReactTableDemo } from '../pages/react-table-demo'
import { Layout } from '../pages/layout'
import { Welcome } from '../pages/welcome'

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
        path: 'react-table-demo',
        element: <ReactTableDemo />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
        // loader: redirectIfUser,
      },
      {
        path: 'logout',
        // action: logoutUser,
      },
    ],
  },
])

export default router

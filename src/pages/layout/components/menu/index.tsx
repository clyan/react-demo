/**
 * @description 路由映射菜单
 * @author clyan
 */

import { type ReactNode, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import router from '../../../../router'
import type { PropsWithStyleAndClassName } from '../../../../model/type'

export function MenuInner(props: PropsWithStyleAndClassName) {
  const { style, className } = props

  const renderMenu = useCallback((menus: typeof router.routes): ReactNode => {
    return (
      <ul>
        {
          menus?.map((route) => {
            if (route.children) {
              return (
                <li key={route.id}>
                  {renderMenu(route.children)}
                </li>
              )
            }

            return (
              route.path && (
              <li key={route.id}>
                <Link to={route.path}>
                  { route.path }
                </Link>
              </li>
              )
            )
          })
        }
      </ul>
    )
  }, [])

  return (
    <div className={className} style={style}>
      {renderMenu(router.routes)}
    </div>
  )
}

export const Menu = memo(MenuInner)
